/* eslint-disable no-undef */

db = connect( 'mongodb://localhost/marketplace' )

db.categories.insertMany( [
	{
		name: 'men',
	},
	{
		name: 'women',
	},
	{
		name: 'teens',
	},
] )

db.products.insertMany( [
	{
		name: 'Frock coat',
		description: 'Formal men\'s coat characterised by a knee-length skirt cut all around the base just above the knee.',
		price: 150,
		quantity: 9,
		category: 'men',
	},
	{
		name: 'Justacorps',
		description: 'A justacorps or justaucorps is a knee-length coat worn by men in the latter half of the 17th century and throughout the 18th century',
		price: 210,
		quantity: 0,
		category: 'men',
	},
	{
		name: 'Smoking jacket',
		description: 'Informal men\'s style of lounge jacket originally intended for tobacco smoking, designed in the 1850s.',
		price: 350,
		quantity: 5,
		category: 'men',
	},
	{
		name: 'Doublet',
		description: 'Snug-fitting jacket that is shaped and fitted to the man\'s body, used from the late Middle Ages up to the mid-17th century.',
		price: 160,
		quantity: 18,
		category: 'men',
	},
	// {
	// 	name: 'Jerkin',
	// 	description: 'Short close-fitting sleeveless jacket of light-coloured leather for wearing over a doublet.',
	// 	price: 90,
	// 	quantity: 16,
	// 	category: 'men',
	// },
] )

db.products.insertMany( [
	{
		name: 'Crinoline petticoat',
		description: 'Stiff or structured petticoat (underskirt) designed to hold out a skirt, popular at various times since the mid-19th century.',
		price: 30,
		quantity: 25,
		category: 'women',
	},
	{
		name: 'Corset',
		description: 'Support garment to hold and train the torso into a desired shape.',
		price: 300,
		quantity: 15,
		category: 'women',
	},
	{
		name: 'Farthingale',
		description: 'A set of structures used to support the skirt in the desired shape and enlarge the lower half of the body.',
		price: 80,
		quantity: 20,
		category: 'women',
	},
	{
		name: 'Bodice',
		description: 'Upper garment covering the torso from the neck to the waist, common in Europe during the 16th to the 18th century.',
		price: 45,
		quantity: 12,
		category: 'women',
	},

] )

db.products.insertMany( [
	{
		name: 'Tunic',
		description: 'Simple garmet covering the body from the shoulders to just above the knees.',
		price: 20,
		quantity: 50,
		category: 'teens',
	},
	{
		name: 'Knickerbockers',
		description: 'Baggy-kneed breeches, often used for sports.',
		price: 20,
		quantity: 50,
		category: 'teens',
	},
	{
		name: 'Gababerdine belted overcoat',
		description: 'Overcoat for cold and rainy weather, a necessary part of a school uniform.',
		price: 20,
		quantity: 120,
		category: 'teens',
	},
] )
