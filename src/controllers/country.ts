import { RequestHandler } from "express";
import createHttpError from "http-errors";
import Country from "../models/country/country";
import { AddCountryBody, updateCountryBody } from "../types/country.types";

// @desc    Retrive All Countries
// @route   GET /api/countries
// @access  ADMIN //TODO
export const getAllCountriesOrFeatured: RequestHandler = async (
  req,
  res,
  next
) => {
  const featured = req.query.featured;

  let countries;

  if (featured === "true") {
    countries = await Country.find({
      isFeatured: true,
    });
  } else {
    // await fetchData();
    countries = await Country.find();
  }
  res.setHeader("Content-Range", "30");
  res.setHeader("Access-Control-Expose-Headers", "Content-Range");
  res.status(200).send(countries);
};

// @desc    Retrive Single Country
// @route   GET /api/countries/:id
// @access  PUBLIC
export const getCountry: RequestHandler = async (req, res, next) => {
  const { id } = req.params;

  const country = await Country.findById(id);

  if (!country) throw createHttpError.NotFound("Country Not Found");

  res.status(200).send(country);
};

// @desc    Add New Country
// @route   POST /api/countries
// @access  ADMIN //TODO
export const addCountry: RequestHandler = async (req, res, next) => {
  const country: AddCountryBody = req.body;

  const newCountry = new Country(country);

  const savedCountry = await newCountry.save();

  res.status(201).send({
    message: "Successfully added Country",
    country: savedCountry,
  });
};

// @desc    Update Country
// @route   PUT /api/countries/:id
// @access  ADMIN //TODO
export const updateCountry: RequestHandler = async (req, res, next) => {
  const { id } = req.params;
  const newCountry: updateCountryBody = req.body;

  const country = await Country.findByIdAndUpdate(id, newCountry);

  if (!country) throw createHttpError.NotFound("Country Not Found");

  res.status(200).send({
    message: "Country Updated Successfully",
    country,
  });
};

// @desc    Delete Country
// @route   PUT /api/countries/:id
// @access  ADMIN //TODO
export const deleteCountry: RequestHandler = async (req, res, next) => {
  const { id } = req.params;

  const country = await Country.findByIdAndRemove({ _id: id });

  if (!country) createHttpError.NotFound("Country Not Found");

  res.status(200).send({
    message: "Country deleted Successfully",
    country,
  });
};

async function fetchData() {
  try {
    const results = await Country.aggregate([
      {
        $lookup: {
          from: "cities",
          localField: "_id",
          foreignField: "country",
          as: "cities",
        },
      },
      {
        $unwind: {
          path: "$cities",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $group: {
          _id: "$_id",
          name: { $first: "$name" },
          count: { $sum: 1 },
        },
      },
      {
        $project: {
          _id: 1,
          name: 1,
          count: 1,
        },
      },
    ]);

    console.log(results);
  } catch (error) {
    console.error(error);
  }
}
