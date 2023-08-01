require('dotenv').config()

const { CONNECTION_STRING } = process.env
const Sequelize = require('sequelize')
const sequelize = new Sequelize(CONNECTION_STRING, {
    dialect: 'postgres',
    dialectOptions: {
        ssl: {
            rejectUnauthorized: false
        }
    }
})

module.exports = {
    seed: (req, res) => {
        sequelize.query(`
            drop table if exists parks;

            create table parks (
                park_id serial primary key, 
                park_name varchar,
                address varchar,
                miles_of_trail serial,
                image_url varchar

            );

            insert into parks (park_name, address, miles_of_trail, image_url) values 
            ('Cuyuna Lakes', '17934 Co Rd 30, Ironton, MN 56455', 25, 'https://tinyurl.com/mnmtnbiking'),
            ('Elm Creek', '1688 W Hayden Lake Rd, Champlin, MN 55316', 13, 'https://tinyurl.com/elmcreekbiking'),
            ('Theodore Wirth', '1688 W Hayden Lake Rd, Champlin, MN 55316', 12, 'https://tinyurl.com/elmcreekbiking'),
            ('Piedmont', '2226 Hutchinson Rd, Duluth, MN 55811', 13, 'https://tinyurl.com/mtnbikingpiedmont' ),
            ('Lebanon Hills', '4801 Johnny Cake Ridge Rd, Eagan, MN 55122', 12, 'https://tinyurl.com/mtnbikinglebanonhills');



            `).then(() => {
            console.log('DB seeded!')
            res.sendStatus(200)
        }).catch(err => console.log('error seeding DB', err))
    },

    getParks: (req, res) => {
        sequelize.query(`select * from parks`)
            .then(dbRes => res.status(200).send(dbRes[0]))
            .catch(err => res.status(500).send(err))
        console.log(dbRes[0])
    },

}