import { RequestHandler } from "express";

import { ERRORS, ENTITES, MESSAGES } from "../utils/utils";

import Country from "../models/country/country";
import { AddCountryBody, updateCountryBody } from "../types/country.types";

const MAX_FEATURED_COUTRIES = 6;

const COUNTRY = {
  NOT_FOUND: ERRORS.NOT_FOUND(ENTITES.COUNTRY),
  DUPLICATION: ERRORS.DUPLICATION(ENTITES.COUNTRY, "Name"),
  MAX: ERRORS.MAX(ENTITES.COUNTRY),
  CREATED: MESSAGES.CREATED(ENTITES.COUNTRY),
  UPDATED: MESSAGES.UPDATED(ENTITES.COUNTRY),
  DELETED: MESSAGES.DELETED(ENTITES.COUNTRY),
};

// @desc    Retrive All Countries
// @route   GET /api/countries
// @access  PUBLIC
export const getCountries: RequestHandler = async (req, res, next) => {
  const { findFilter, sort = { name: 1 }, startIndex = 0, limit = 10 } = req;

  const countries = await Country.find(findFilter)
    .limit(limit)
    .skip(startIndex)
    .sort(sort);

  res.status(200).send(countries);
};

// @desc    Retrive Single Country
// @route   GET /api/countries/:id
// @access  PUBLIC
export const getCountry: RequestHandler = async (req, res, next) => {
  const { id } = req.params;

  const country = await Country.findById(id);

  if (!country) return next(COUNTRY.NOT_FOUND);

  res.status(200).send(country);
};

// @desc    Add New Country
// @route   POST /api/countries
// @access  ADMIN
export const addCountry: RequestHandler = async (req, res, next) => {
  const body: AddCountryBody = req.body;

  // CHECK for duplication name
  const country = await Country.findOne({
    name: body.name,
  });
  if (country) return next(COUNTRY.DUPLICATION);

  // CHECK for the number of featured countries
  if (body.isFeatured) {
    const featuredCount = await Country.count({
      isFeatured: true,
    });
    if (featuredCount === MAX_FEATURED_COUTRIES) return next(COUNTRY.MAX);
  }

  const newCountry = new Country(body);

  const savedCountry = await newCountry.save();

  res.status(201).send({
    message: COUNTRY.CREATED,
    country: savedCountry,
  });
};

// @desc    Update Country
// @route   PATCH /api/countries/:id
// @access  ADMIN
export const updateCountry: RequestHandler = async (req, res, next) => {
  const { id } = req.params;
  const body: updateCountryBody = req.body;

  // CHECK for duplication name
  const country = await Country.findOne({
    name: body.name,
  });
  if (country) return next(COUNTRY.DUPLICATION);

  if (body.isFeatured) {
    const featuredCount = await Country.count({
      isFeatured: true,
    });

    if (featuredCount === MAX_FEATURED_COUTRIES) return next(COUNTRY.MAX);
  }

  const updatedCountry = await Country.findByIdAndUpdate(id, body, {
    new: true,
  });

  if (!updatedCountry) return next(COUNTRY.NOT_FOUND);
  res.status(200).send({
    message: COUNTRY.UPDATED,
    country: updatedCountry,
  });
};

// @desc    Delete Country
// @route   PUT /api/countries/:id
// @access  ADMIN
export const deleteCountry: RequestHandler = async (req, res, next) => {
  const { id } = req.params;

  const country = await Country.findByIdAndRemove(id);

  if (!country) return next(COUNTRY.NOT_FOUND);

  res.status(200).send({
    message: COUNTRY.DELETED,
    country,
  });
};

// async function fetchData() {
//   try {
//     const results = await Country.aggregate([
//       {
//         $lookup: {
//           from: "cities",
//           localField: "_id",
//           foreignField: "country",
//           as: "cities",
//         },
//       },
//       {
//         $unwind: {
//           path: "$cities",
//           preserveNullAndEmptyArrays: true,
//         },
//       },
//       {
//         $group: {
//           _id: "$_id",
//           name: { $first: "$name" },
//           count: { $sum: 1 },
//         },
//       },
//       {
//         $project: {
//           _id: 1,
//           name: 1,
//           count: 1,
//         },
//       },
//     ]);

//     console.log(results);
//   } catch (error) {
//     console.error(error);
//   }
// }
