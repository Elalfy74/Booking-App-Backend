import { RequestHandler } from 'express';

import { ENTITIES, Utils } from '../utils';
import { isMaxFeatured } from '../utils/is-max-featured';

import { Country } from '../models';
import { AddCountryBody, updateCountryBody } from '../types/country.types';

const MAX_FEATURED_COUNTRIES = 6;

const COUNTRY = new Utils(ENTITIES.COUNTRY);

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
export const getCountryById: RequestHandler = async (req, res, next) => {
  const { id } = req.params;

  const country = await Country.findById(id);

  if (!country) return next(COUNTRY.NOT_FOUND());

  res.status(200).send(country);
};

// @desc    Add New Country
// @route   POST /api/countries
// @access  ADMIN
export const addCountry: RequestHandler = async (req, res, next) => {
  const body: AddCountryBody = req.body;

  await checkDuplicationAndFeatured(body.name, body.isFeatured);

  const country = new Country(body);

  const savedCountry = await country.save();

  res.status(201).send({
    message: COUNTRY.CREATED(),
    country: savedCountry,
  });
};

// @desc    Update Country
// @route   PATCH /api/countries/:id
// @access  ADMIN
export const updateCountryById: RequestHandler = async (req, res, next) => {
  const { id } = req.params;
  const body: updateCountryBody = req.body;

  await checkDuplicationAndFeatured(body.name, body.isFeatured);

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
export const deleteCountryById: RequestHandler = async (req, res, next) => {
  const { id } = req.params;

  const country = await Country.findByIdAndRemove(id);

  if (!country) return next(COUNTRY.NOT_FOUND());

  res.status(200).send({
    message: COUNTRY.DELETED(),
    country,
  });
};

// *********** Helpers ***********

const checkCountryDuplication = async (name: string) => {
  const country = await Country.findOne({ name });
  if (country) throw COUNTRY.DUPLICATION('name');
};

const checkDuplicationAndFeatured = async (name?: string, isFeatured?: boolean) => {
  if (name) {
    await checkCountryDuplication(name);
  }

  if (isFeatured === true) {
    const isMax = await isMaxFeatured(Country, MAX_FEATURED_COUNTRIES);
    if (isMax) throw COUNTRY.MAX();
  }
};
