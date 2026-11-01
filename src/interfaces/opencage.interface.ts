export interface OpenCageResponse {
  documentation: string;
  licenses: License[];
  rate: Rate;
  results: Result[];
  status: Status;
  stay_informed: StayInformed;
  thanks: string;
  timestamp: Timestamp;
  total_results: number;
}

export interface License {
  name: string;
  url: string;
}

export interface Rate {
  limit: number;
  remaining: number;
  reset: number;
}

export interface Result {
  bounds: Bounds;
  components: Components;
  confidence: number;
  distance_from_q: DistanceFromQ;
  formatted: string;
  geometry: Geometry;
}

export interface Bounds {
  northeast: Geometry;
  southwest: Geometry;
}

export interface Geometry {
  lat: number;
  lng: number;
}

export interface Components {
  'ISO_3166-1_alpha-2': string;
  'ISO_3166-1_alpha-3': string;
  'ISO_3166-2': string[];
  _category: string;
  _normalized_city: string;
  _type: string;
  borough: string;
  city: string;
  continent: string;
  country: string;
  country_code: string;
  coworking_space: string;
  house_number: string;
  neighbourhood: string;
  political_union: string;
  postcode: string;
  quarter: string;
  road: string;
  state: string;
  state_code: string;
  suburb: string;
}

export interface DistanceFromQ {
  meters: number;
}

export interface Status {
  code: number;
  message: string;
}

export interface StayInformed {
  blog: string;
  mastodon: string;
}

export interface Timestamp {
  created_http: string;
  created_unix: number;
}
