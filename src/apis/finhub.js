import axios from "axios"
const TOKEN="cqielrpr01qicov5gpggcqielrpr01qicov5gph0"

export default axios.create({
    baseURL:"https://finnhub.io/api/v1",
    params:{
        token:TOKEN
    }
})