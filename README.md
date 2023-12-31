http://localhost:3000/getHospitals (POST Request)

Input:
{
    "district_id": 363,
    "date": "30-06-2022",
    "limit": 20
}

Output 1:
{
    "code": 200,
    "message": "Hospitals sent successfully",
    "result": [
        {
            "name": "Bajaj PMC G14 Galande Hospital",
            "sessions": [
                {
                    "available_capacity": 50,
                    "vaccine": "COVISHIELD"
                },
                {
                    "available_capacity": 250,
                    "vaccine": "COVISHIELD"
                }
            ]
        },
        {
            "name": "Kalas PHC Taluka Indapur 413105",
            "sessions": [
                {
                    "available_capacity": 50,
                    "vaccine": "COVISHIELD"
                },
                {
                    "available_capacity": 250,
                    "vaccine": "COVISHIELD"
                }
                ]
        }
    ]
}

Output 2:
{
    "code": 500,
    "message": "Cannot enter past dates!"
}


Validations:
1. Cannot enter date before today's date
2. Basic Validation: "district_id" & "limit" are integers, and "date" is a string

Important points: 
1. "limit" key in input is optional, if "limit" is not provided, default limit should be 10.
2. Give appropriate error response if given input is invalid.
3. Save api response in hospitals.txt file. Don't append data to existing file, if the program is re-run, delete previous data and insert new data.
