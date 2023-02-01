import { RequestHandler } from "express";
import createHttpError from "http-errors";
import City from "../models/city/city";
import { AddCityBody, updateCityBody } from "../types/city.types";

// @desc    Retrive All cities
// @route   GET /api/cities
// @access  ADMIN //TODO
export const getAllCitiesOrFeatured: RequestHandler = async (
  req,
  res,
  next
) => {
  const { featured, country } = req.query;

  let cities;
  let isFeaturedFilter = {};

  if (featured === "true") isFeaturedFilter = { isFeatured: true };

  if (country === "true") {
    cities = await City.find(isFeaturedFilter).populate("country");
  } else {
    cities = await City.find(isFeaturedFilter);
  }
  res.setHeader("Content-Range", "30");
  res.setHeader("Access-Control-Expose-Headers", "Content-Range");

  res.status(200).send(cities);
};

// @desc    Retrive Single City
// @route   GET /api/cities/:id
// @access  PUBLIC
export const getCity: RequestHandler = async (req, res, next) => {
  const { id } = req.params;

  const city = await City.findById(id);

  if (!city) throw createHttpError.NotFound("City Not Found");

  res.status(200).send(city);
};

// @desc    Add New City
// @route   POST /api/cities
// @access  ADMIN //TODO
export const addCity: RequestHandler = async (req, res, next) => {
  const { name, country, photos, isFeatured }: AddCityBody = req.body;

  const newCity = new City({
    name,
    country,
    photos,
    isFeatured,
  });

  const savedCity = await newCity.save();

  res.status(201).send({
    message: "Successfully added City",
    city: savedCity,
  });
};

// @desc    Update City
// @route   PATCH /api/citis/:id
// @access  ADMIN //TODO
export const updateCity: RequestHandler = async (req, res, next) => {
  const { id } = req.params;
  const newCity: updateCityBody = req.body;

  const city = await City.findByIdAndUpdate(id, newCity);

  if (!city) throw createHttpError.NotFound("City Not Found");

  res.status(200).send({
    message: "City Updated Successfully",
    city,
  });
};

// @desc    Delete City
// @route   PUT /api/cities/:id
// @access  ADMIN //TODO
export const deleteCity: RequestHandler = async (req, res, next) => {
  const { id } = req.params;

  const city = await City.findByIdAndRemove({ _id: id });

  if (!city) createHttpError.NotFound("City Not Found");

  res.status(200).send({
    message: "City deleted Successfully",
    city,
  });
};
