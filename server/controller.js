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
        drop table if exists favorites;
        drop table if exists parks;
        


            create table parks (
                park_id serial primary key, 
                park_name varchar,
                address varchar,
                miles_of_trail serial,
                image_url varchar,
                region varchar

            );

            create table favorites (
                favorites_id serial primary key,
                park_id serial references parks(park_id),
                notes varchar
            );

            insert into parks (park_name, address, miles_of_trail, image_url, region) values 
            ('Cuyuna Lakes', 'Ironton, MN', 25, 'https://tinyurl.com/mnmtnbiking', 'Northern'),
            ('Elm Creek', 'Champlin, MN', 13, 'https://tinyurl.com/elmcreekbiking', 'Twin Cities/Central'),
            ('Theodore Wirth', 'Minneapolis, MN', 12, 'https://tinyurl.com/theowirthmtnbiking', 'Twin Cities/Central'),
            ('Piedmont', 'Duluth, MN', 13, 'https://tinyurl.com/mtnbikingpiedmont', 'Northern'),
            ('Lebanon Hills', 'Eagan, MN', 12, 'https://tinyurl.com/mtnbikinglebanonhills','Twin Cities/Central'),
            ('Gamehaven', 'Rochester, MN', 12, 'https://tinyurl.com/gamehavenmtnbiking', 'Southern'),
            ('Tioga', 'Cohasset, MN', 25, 'https://tinyurl.com/Tiogamtnbiking', 'Northern'),
            ('Movil Maze', 'Bemidji, MN', 15,'https://tinyurl.com/Tioggamtnbiking', 'Northern');

            `).then(() => {
            console.log('DB seeded!')
            res.sendStatus(200)
        }).catch(err => console.log('error seeding DB', err))
    },

    getParks: (req, res) => {
        sequelize.query(`select * from parks`)
            .then(dbRes => res.status(200).send(dbRes[0]))
            .catch(err => res.status(500).send(err))
    },

    getFavorites: (req, res) => {
        sequelize.query(`select
        favorites.favorites_id,
        favorites.notes,
        parks.park_id, 
        parks.park_name,
        parks.address,
        parks.miles_of_trail,
        parks.image_url,
        parks.region
        from favorites join
        parks on favorites.park_id = parks.park_id;
        `)
            .then(dbRes => {
                res.status(200).send(dbRes[0])
            })
            .catch(err => res.status(500).send(err))
    },

    addToFavorites: (req, res) => {
        const { park_id, notes } = req.body;
        sequelize.query(`insert into favorites (park_id, notes)
        values (${park_id}, '${notes}') returning *;`)
            .then(dbRes => {
                res.status(200).send(dbRes[0])
            })
            .catch(err => res.status(500).send(err))
    },

    createParks: (req, res) => {
        const { park_name, address, miles_of_trail, image_url, region } = req.body;
        sequelize.query(`insert into parks (park_name, address, miles_of_trail, image_url, region)
        values ('${park_name}', '${address}', ${miles_of_trail}, '${image_url}','${region}') returning *;`)
            .then(dbRes => {
                res.status(200).send(dbRes[0])
            })
            .catch(err => res.status(500).send(err))
    },

    deleteFavorite: (req, res) => {
        const { id } = req.params
        sequelize.query(`
        delete from favorites where favorites_id = ${id};`
        )
            .then(dbRes => res.status(200).send(dbRes[0]))
            .catch(err => res.status(500).send(err))
    },

    updateFavoritesNotes: (req, res) => {
        const { id } = req.params
        const { notes } = req.body
        sequelize.query(`update favorites set notes = '${notes}' where favorites_id = ${id};`)
            .then(dbRes => res.status(200).send(dbRes[0]))
            .catch(err => res.status(500).send(err))
    }
}