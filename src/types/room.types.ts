export interface IRoom {
  _id: string;
  title: string;
  maxPeople: {
    adults: number;
    children: number;
  };
  beds: string;
  currentPrice: number;
}

export interface AddRoomBody {
  _id?: string;
  title: string;
  maxPeople: {
    adults: number;
    children: number;
  };
  beds: string;
  currentPrice: number;
}
