import request from 'supertest';
import mongoose, { ObjectId } from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import City from '../../models/city/city';

import app from '../../startup/create-server';
import { AddCityBody } from '../../types/city.types';

const testToken = process.env.TEST_TOKEN || '';
const id = new mongoose.Types.ObjectId().toHexString() as unknown as ObjectId;

const createCityBody: AddCityBody = {
  name: 'city_name',
  country: id,
  photos: ['dddddd'],
};

function addCityToDB(isFeatured?: boolean) {
  const cityId = new mongoose.Types.ObjectId() as unknown as ObjectId;

  if (isFeatured === undefined) isFeatured = false;

  const newCity = {
    ...createCityBody,
    _id: cityId,
    isFeatured,
  };

  const city = new City(newCity);
  return city.save();
}

describe('/api/cities', () => {
  beforeAll(async () => {
    const mongoServer = await MongoMemoryServer.create();

    await mongoose.connect(mongoServer.getUri());
  });

  afterAll(async () => {
    await mongoose.disconnect();
    await mongoose.connection.close();
  });

  describe('GET /', () => {
    it('should return empty array', async () => {
      const res = await request(app).get('/api/cities');

      expect(res.status).toBe(200);
      expect(res.body).toHaveLength(0);
    });

    it('should return all cities', async () => {
      await addCityToDB();
      const res = await request(app).get('/api/cities');

      expect(res.status).toBe(200);
      expect(res.body).toHaveLength(1);
    });
  });

  describe('GET /:id', () => {
    it('should return 400 wrong id type', async () => {
      const res = await request(app).get('/api/cities/1234');

      expect(res.status).toBe(400);
    });

    it('should return 404 not found', async () => {
      const res = await request(app).get(`/api/cities/${id}`);

      expect(res.status).toBe(404);
    });

    it('should return city with status code 200', async () => {
      const { _id: cityId } = await addCityToDB();

      const res = await request(app).get(`/api/cities/${cityId}`);

      expect(res.status).toBe(200);
    });
  });

  describe('POST /', () => {
    it('should return 401 no token', async () => {
      const res = await request(app).post('/api/cities');

      expect(res.status).toBe(401);
    });

    it('should return 400 no body', async () => {
      const res = await request(app).post('/api/cities').set('Cookie', `JWT_TOKEN=${testToken}`);

      expect(res.status).toBe(400);
    });

    it('should return 201 added city', async () => {
      const res = await request(app)
        .post('/api/cities')
        .send(createCityBody)
        .set('Cookie', `JWT_TOKEN=${testToken}`);

      expect(res.status).toBe(201);
    });

    // it('should return 404 not found', async () => {
    //   const res = await request(app).get(`/api/cities/${id}`);

    //   expect(res.status).toBe(404);
    // });
  });
});
