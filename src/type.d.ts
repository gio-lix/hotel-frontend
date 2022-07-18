export interface OptionProps {
    adult: number,
    children: number,
    room: number,
}

export interface DatesProps {
    startDate: Date
    endDate: Date
    key: string
}

export interface HotelType {
    _id: string
    name: string
    type: string
    city: string
    address: string
    distance: string
    desc: string
    photos: any
    rooms: []
    cheapestPrice: number
    featured: boolean
}

export interface RoomNumberType {
    number: number,
    unavailableDates: {}[]
    _id: string
}

export interface RoomType {
    _id: string
    title: string
    price: number
    maxPeople: number
    desc: string
    roomNumber: any
}