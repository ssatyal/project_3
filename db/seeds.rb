# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)
Location.destroy_all
Trip.destroy_all

trips_data = JSON.parse(File.read("db/trips_data.json"))
locations_data = JSON.parse(File.read("db/locations_data.json"))

trip = Trip.create!(trips_data[1])
trip.locations.create!(locations_data[0])

trip2 = trip2 = Trip.create!(trips_data[3])
trip2.locations.create!(locations_data[1])
trip2.locations.create!(locations_data[2])

trip3 = Trip.create!(trips_data[0])
trip3.locations.create!(locations_data[0])
trip3.locations.create!(locations_data[1])
trip3.locations.create!(locations_data[2])

trip4 = Trip.create!(trips_data[2])
trip4.locations.create!(locations_data[0])
trip4.locations.create!(locations_data[1])
trip4.locations.create!(locations_data[2])
trip4.locations.create!(locations_data[3])

# Trip.create!([
#   {"name":"Project 3",
#     "category":"Review",
#     "locations": [
#       {"name": "General Assembly Washington DC","lat":38.904877,"long": -77.036217}
#     ]
#   }
# ])
