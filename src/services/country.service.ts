import Country from '../models/country/country';
import { AddCountryBody } from '../types/country.types';
import { Utils, ENTITIES } from '../utils/utils';

const MAX_FEATURED_COUNTRIES = 6;

const COUNTRY = new Utils(ENTITIES.COUNTRY);

export class CountryServices {
  async addCountry(body: AddCountryBody) {
    await this.checkDuplicationAndFeatured(body.name, body.isFeatured);

    return Country.create(body);
  }

  // Helper Methods
  private async checkCountryDuplication(name: string) {
    const country = await Country.findOne({ name });
    if (country) throw COUNTRY.DUPLICATION('name');
  }

  private async checkFeaturedAvailability() {
    const featuredCount = await Country.count({
      isFeatured: true,
    });
    if (featuredCount === MAX_FEATURED_COUNTRIES) throw COUNTRY.MAX();
  }

  private async checkDuplicationAndFeatured(name: string, isFeatured?: boolean) {
    await this.checkCountryDuplication(name);

    if (isFeatured === true) {
      await this.checkFeaturedAvailability();
    }
  }
}
