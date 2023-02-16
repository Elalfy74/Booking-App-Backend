import { RequestHandler } from 'express';

import { ENTITIES, invalidInput, Utils } from '../utils';
import { isMaxFeatured } from '../utils/is-max-featured';
import { isValidReference } from '../utils/is-valid-reference';

import { City, Country } from '../models';
import { AddCityBody, updateCityBody } from '../types/city.types';

const MAX_FEATURED_CITIES = 6;

const CITY = new Utils(ENTITIES.CITY);

// @desc    Retrieve All cities
// @route   GET /api/cities
// @access  PUBLIC
export const getCities: RequestHandler = async (req, res, next) => {
  const { findFilter, sort = { name: 1 }, startIndex = 0, limit = 10 } = req;
  const { withCountry } = req.query;

  const country = withCountry ? 'country' : '';

  const cities = await City.find(findFilter)
    .populate(country)
    .limit(limit)
    .skip(startIndex)
    .sort(sort);

  res.status(200).send(cities);
};

// @desc    Retrieve Single City
// @route   GET /api/cities/:id
// @access  PUBLIC
export const getCityById: RequestHandler = async (req, res, next) => {
  const { id } = req.params;

  const city = await City.findById(id);

  if (!city) return next(CITY.NOT_FOUND());

  res.status(200).send(city);
};

// @desc    Add New City
// @route   POST /api/cities
// @access  ADMIN
export const addCity: RequestHandler = async (req, res, next) => {
  const body: AddCityBody = req.body;

  await checkReferenceAndFeatured(body.country, body.isFeatured);

  const newCity = new City(body);

  const savedCity = await newCity.save();

  res.status(201).send({
    message: CITY.CREATED(),
    city: savedCity,
  });
};

// @desc    Update City
// @route   PATCH /api/cities/:id
// @access  ADMIN
export const updateCityById: RequestHandler = async (req, res, next) => {
  const { id } = req.params;
  const body: updateCityBody = req.body;

  await checkReferenceAndFeatured(body.country, body.isFeatured);

  const city = await City.findByIdAndUpdate(id, body, {
    new: true,
  });

  if (!city) return next(CITY.NOT_FOUND());

  res.status(200).send({
    message: CITY.UPDATED(),
    city,
  });
};

// @desc    Delete City
// @route   PUT /api/cities/:id
// @access  ADMIN
export const deleteCity: RequestHandler = async (req, res, next) => {
  const { id } = req.params;

  const city = await City.findByIdAndRemove(id);

  if (!city) return next(CITY.NOT_FOUND());

  res.status(200).send({
    message: CITY.DELETED(),
    city,
  });
};

// *********** Helpers ***********

const checkReferenceAndFeatured = async (country?: string, isFeatured?: boolean) => {
  if (country) {
    const isValid = await isValidReference({
      id: country,
      Model: Country,
    });
    if (!isValid) throw invalidInput(ENTITIES.COUNTRY);
  }

  if (isFeatured) {
    const isMax = await isMaxFeatured(City, MAX_FEATURED_CITIES);
    if (isMax) throw CITY.MAX();
  }
};
