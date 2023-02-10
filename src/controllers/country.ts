import { RequestHandler } from 'express';

import { ENTITIES, Utils } from '../utils/utils';

import Country from '../models/country/country';
import { updateCountryBody } from '../types/country.types';
import { CountryServices } from '../services/country.service';

const MAX_FEATURED_COUNTRIES = 6;

const COUNTRY = new Utils(ENTITIES.COUNTRY);
const countryServices = new CountryServices();

// @desc    Retrieve All Countries
// @route   GET /api/countries
// @access  PUBLIC
export const getCountries: RequestHandler = async (req, res, next) => {
  const { findFilter, sort = { name: 1 }, startIndex = 0, limit = 10 } = req;

  const countries = await Country.find(findFilter).limit(limit).skip(startIndex).sort(sort);

  res.status(200).send(countries);
};

// @desc    Retrieve Single Country
// @route   GET /api/countries/:id
// @access  PUBLIC
export const getCountry: RequestHandler = async (req, res, next) => {
  const { id } = req.params;

  const country = await Country.findById(id);

  if (!country) return next(COUNTRY.NOT_FOUND());

  res.status(200).send(country);
};

// @desc    Add New Country
// @route   POST /api/countries
// @access  ADMIN
export const addCountry: RequestHandler = async (req, res, next) => {
  const savedCountry = await countryServices.addCountry(req.body);

  res.status(201).send({
    message: COUNTRY.CREATED(),
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
  if (country) return next(COUNTRY.DUPLICATION('name'));

  if (body.isFeatured) {
    const featuredCount = await Country.count({
      isFeatured: true,
    });

    if (featuredCount === MAX_FEATURED_COUNTRIES) return next(COUNTRY.MAX());
  }

  const updatedCountry = await Country.findByIdAndUpdate(id, body, {
    new: true,
  });

  if (!updatedCountry) return next(COUNTRY.NOT_FOUND());
  res.status(200).send({
    message: COUNTRY.UPDATED(),
    country: updatedCountry,
  });
};

// @desc    Delete Country
// @route   PUT /api/countries/:id
// @access  ADMIN
export const deleteCountry: RequestHandler = async (req, res, next) => {
  const { id } = req.params;

  const country = await Country.findByIdAndRemove(id);

  if (!country) return next(COUNTRY.NOT_FOUND());

  res.status(200).send({
    message: COUNTRY.DELETED(),
    country,
  });
};
