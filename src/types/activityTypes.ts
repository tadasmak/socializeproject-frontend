export interface ActivityDetailType {
    id: number
    title: string
    description: string
    location: string
    start_time: Date
    max_participants: number
    minimum_age: number
    maximum_age: number
    status: string
    activity_type_name: string
    creator: {
        id: number
        username: string
    }
    participants: Array<{
        id: number
        username: string
        age: number
    }>
    participants_count: number
}

export interface ActivityCardType {
    id: number
    title: string
    description: string
    location: string
    start_time: Date
    max_participants: number
    minimum_age: number
    maximum_age: number
    activity_type_name: string
    participants_count: number
}

export interface ActivityFormType {
    title: string
    description: string
    location: string
    start_time: Date
    max_participants: number
    minimum_age: number
    maximum_age: number
    activity_type_name: string
}