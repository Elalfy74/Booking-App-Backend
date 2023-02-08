import { RequestHandler } from 'express';

import { ENTITES, Utils } from '../utils/utils';

import City from '../models/city/city';
import { AddCityBody, updateCityBody } from '../types/city.types';

const MAX_FEATURED_CITIES = 6;

const CITY = new Utils(ENTITES.CITY);

// @desc    Retrive All cities
// @route   GET /api/cities
// @access  PUBLIC
export const getCities: RequestHandler = async (req, res, next) => {
  const { findFilter, sort = { name: 1 }, startIndex = 0, limit = 10 } = req;
  const { withCountry } = req.query;

  const country = withCountry && typeof withCountry === 'string' ? 'country' : '';

  const cities = await City.find(findFilter)
    .populate(country)
    .limit(limit)
    .skip(startIndex)
    .sort(sort);

  res.status(200).send(cities);
};

// @desc    Retrive Single City
// @route   GET /api/cities/:id
// @access  PUBLIC
export const getCity: RequestHandler = async (req, res, next) => {
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

  if (body.isFeatured) {
    const featuredCount = await City.count({
      isFeatured: true,
    });

    if (featuredCount === MAX_FEATURED_CITIES) return next(CITY.MAX());
  }

  const newCity = new City(body);

  const savedCity = await newCity.save();

  res.status(201).send({
    message: CITY.CREATED(),
    city: savedCity,
  });
};

// @desc    Update City
// @route   PATCH /api/citis/:id
// @access  ADMIN
export const updateCity: RequestHandler = async (req, res, next) => {
  const { id } = req.params;
  const body: updateCityBody = req.body;

  if (body.isFeatured) {
    const featuredCount = await City.count({
      isFeatured: true,
    });

    if (featuredCount === MAX_FEATURED_CITIES) return next(CITY.MAX());
  }

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
