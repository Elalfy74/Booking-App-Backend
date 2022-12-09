import { RequestHandler } from "express";
import createError from "http-errors";
import City from "../models/city/city";
import { AddCityBody } from "../types/city.types";

export const addCity: RequestHandler = async (req, res, next) => {
  const { name, country, photo }: AddCityBody = req.body;

  const newCity = new City({
    name,
    country,
    photo,
  });

  const savedCity = await newCity.save();

  res.status(201).send({
    message: "Successfully added City",
    city: savedCity,
  });
};

export const getAllCities: RequestHandler = async (req, res, next) => {
  const cities = await City.find();

  res.status(201).send({
    cities,
  });
};

export const getCity: RequestHandler = async (req, res, next) => {
  const id = req.params;

  const city = await City.findById(id);

  if (!city) throw createError.NotFound("City Not Found");

  res.status(201).send({
    city,
  });
};
