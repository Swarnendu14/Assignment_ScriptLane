const fs = require("fs");
const axios = require("axios");

const showResult = async function (req, res) {
    try {
        let { district_id, date, limit } = req.body;
        if (!district_id)
            return res.status(400).json({ "code": 400, "message": "district_id is required" });
        if (!date)
            return res.status(400).json({ "code": 400, "message": "date is required" });
        if (!limit)
            limit = 10;
        if(limit<0)
            return res.status(400).json({ "code": 400, "message": "Limit can't contain negative value" });
        //district_id should be Integer value
        if (typeof (district_id) != 'number')
            return res.status(400).json({ "code": 400, "message": "district_id datatype is not Integer" });
        if (district_id % 1 !== 0)
            return res.status(400).json({ "code": 400, "message": "district_id datatype is not Integer" });

        if (typeof (date) != 'string')
            return res.status(400).json({ "code": 400, "message": "Date datatype is not String" });


        const today = new Date();
        const yyyy = today.getFullYear();
        let mm = today.getMonth() + 1;
        let dd = today.getDate();
        let arr = date.split("-");
        if (arr[2] < yyyy) {
            return res.status(400).json({ "code": 400, "message": "Old date given" });
        }
        else {
            if (arr[1] < mm)
                return res.status(400).json({ "code": 400, "message": "Old date given" });
            else {
                if (arr[0] < dd)
                    return res.status(400).json({ "code": 400, "message": "Old date given" });
            }
        }
        const url = `https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByDistrict?district_id=${district_id}&date=${date}`;
        let webData = null;


        // const response= await fetch(url);
        // webData =await response.json();

        const options = {
            method: 'GET',
            url: url,
            headers: {
                accept: 'application/json'
            }
        };
        let response = await axios.request(options)
        webData = response.data;

        let result = [];
        let len = (limit < webData.centers.length) ? (limit) : (webData.centers.length);

        for (let i = 0; i < len; i++) {
            let obj = {};
            obj.name = webData.centers[i].name;
            obj.sessions = [];
            for (let j = 0; j < webData.centers[i].sessions.length; j++) {
                let objSession = {};
                let { available_capacity, vaccine } = webData.centers[i].sessions[j];
                objSession.available_capacity = available_capacity;
                objSession.vaccine = vaccine;
                obj.sessions.push(objSession);
            }
            result.push(obj);
        }
        fs.writeFile('./Textfiles/hospitals.txt', JSON.stringify(result), (err) => { if (err) console.error(err); return; });
        return res.status(200).json({ "code": 200, "message": "Hospitals sent successfully", "result": result });
    }
    catch (err) {
        return res.status(500).json({ "code": 500, "message": err.message });
    }
}


module.exports = { showResult }