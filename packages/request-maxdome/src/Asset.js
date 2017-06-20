class Asset {
  constructor(
    data,
    { hostnames: hostnames = { package: 'maxdome.de', store: 'store.maxdome.de' }, protocol: protocol = 'https' } = {}
  ) {
    this._rawData = data;

    this.hostnames = hostnames;
    this.protocol = protocol;

    this.id = data.id;

    const types = {
      assetvideofilm: 'movie',
      assetvideofilmtvseries: 'episode',
      multiassettvseriesseason: 'season',
      multiassetbundletvseries: 'series',
    };
    this.type = types[data['@class'].toLowerCase()];

    this.title = data.title;
    if (this.type === 'season') {
      this.title += ` (Staffel ${data.number})`;
    }
    this.originalTitle = data.title;
    this.searchTitle = data.title.replace(' (Hot From the UK)', '').replace(' (Hot from the US)', '');
    this.hotFromTheUK = data.title.includes(' (Hot From the UK)');
    this.hotFromTheUS = data.title.includes(' (Hot from the US)');
    this.episodeTitle = data.episodeTitle;
    this.episodeNumber = data.episodeNumber;
    this.seasonNumber = data.seasonNumber || data.number;

    this.description = data.descriptionShort;

    if (data.coverList) {
      const poster = data.coverList.filter(cover => cover.usageType === 'poster')[0];
      if (poster) {
        this.image = poster.url;
      }
    }

    this.areas = [];
    if (data.fullMarkingList.includes('inPremiumIncluded')) {
      this.areas.push('package');
    }
    if (data.mediaUsageList.includes('DTO') || data.mediaUsageList.includes('TVOD')) {
      this.areas.push('store');
    }

    this.countries = data.countryList || [];
    this.duration = data.duration;
    this.fskLevels = data.fskLevelList;
    this.genres = data.genreList
      .filter(genre => genre.genreType === 'genre' || genre.genreType === '_spielfilm')
      .map(genre => genre.value);
    this.languages = data.languageList;
    this.url = `${protocol}://${hostnames.package}/${data.id}`;
    this.productionYear = data.productionYear;

    if (data.userrating) {
      this.rating = {
        averageRating: data.userrating.averageRating,
        countTotal: data.userrating.countTotal,
      };
    }

    if (data.creditList) {
      this.actors = data.creditList
        .filter(credit => credit.creditType === 'actor')
        .map(credit => ({ name: credit.value }));
      this.directors = data.creditList
        .filter(credit => credit.creditType === 'director')
        .map(credit => ({ name: credit.value }));
    }
  }

  getImage(width = 204, height = 295) {
    if (this.image) {
      return {
        height,
        url: this.image.replace('__WIDTH__', width).replace('__HEIGHT__', height),
        width,
      };
    }
  }

  getCanonicalURL() {
    let hostname = this.hostnames.package;
    if (this.areas.includes('store')) {
      hostname = this.hostnames.store;
    }
    const slug = this.originalTitle
      .replace(/ä/g, 'ae')
      .replace(/ö/g, 'oe')
      .replace(/ü/g, 'ue')
      .replace(/ß/g, 'ss')
      .replace(/[.,"'?!;:]/g, '')
      .replace(/\W/g, '-')
      .replace(/_/g, '-')
      .toLowerCase();
    return `${this.protocol}://${hostname}/${slug}-${this.id}.html`;
  }
}

module.exports = Asset;
