# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)
Trip.destroy_all
Location.destroy_all

trips_data = JSON.parse(File.read("db/trips_data.json"))
locations_data = JSON.parse(File.read("db/locations_data.json"))

trip = Trip.create!(trips_data[0])
trip.locations.create!(locations_data[0])
