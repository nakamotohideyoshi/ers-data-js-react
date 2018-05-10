

module.exports = {
  tootip: {
    'Collapsed Farm Typology': {
      'menu': 'Data shown is classified into one of three exclusive categories (typologies) of farms. The typology is based on the occupation of the principal operator and the gross cash farm income of the farming operation.',
      'category': {
        'Residence farms': 'Farms with less than $350,000 in gross cash farm income and the principal operator is either retired or has a primary occupation other than farming',
        'Intermediate farms': 'Farms with less than $350,000 in gross cash farm income and a principal operator whose primary occupation is farming',
        'Commercial farms': 'Farms with $350,000 or more gross cash farm income as well as nonfamily farms'
      }
    },
    'Economic Class': {
      'menu': 'Data shown is classified into one of five exclusive categories of farm sales. Farm sales include livestock and crop income from cash and marketing contract sales, fees received from livestock and crop production contracts, the net change in CCC loans, and government payments.',
      'category': {
        '$1,000,000 or more': 'Farms with total sales equal to or greater than $1,000,000',
        '$500,000 to $999,999': 'Farms with total sales equal to or greater than $500,000, up to $999,999',
        '$250,000 to $499,999': 'Farms with total sales equal to or greater than $250,000, up to $499,999',
        '$100,000 to $249,999': 'Farms with total sales equal to or greater than $100,000, up to $249,999',
        'less than $100,000': 'Farms with total sales up to $100,000'
      }
    },
    'Farm Typology': {
      'menu': 'Data shown is classified into one of seven exclusive categories (typologies) of farms. The typology is based on gross farm sales, the primary occupation of the operators, and whether the farms are family farms. The "new" versions of the typology are based on gross cash farm income rather than gross sales, and the dollar brackets for the categories were raised as well.',
      'category': {
        'Retirement farms (new)': 'Operator\'s primary occupation is retired and gross cash farm income less than $350,000',
        'Off-farm occupation farms (new)': 'Operator\'s primary occupation is nonfarm and gross cash farm income less than $350,000',
        'Farming occupation/lower-sales farms (new)': 'Operator\'s primary occupation is farming and gross cash farm income less than $150,000',
        'Farming occupation/moderate-sales farms (new)': 'Operator\'s primary occupation is farming and gross cash farm income from $150,000 to $349,999',
        'Midsize farms (new)': 'Gross cash farm income from $350,000 to $999,999',
        'Large farms (new)': 'Gross cash farm income from $1,000,000 to $4,999,999',
        'Very large farms (new)': 'Gross cash farm icnome equal to or greater than $5,000,000',
        'Nonfamily farms (new)': 'Farms where the majority of business not owned by the operator and individuals related to the operator',
        'Retirement farms': 'Operator\'s primary occupation is retired and gross value of sales less than $250,000',
        'Residential/lifestyle farms': 'Operator\'s primary occupton is nonfarm and gross value of sales less than $250,000',
        'Farming occupation/lower-sales farms': 'Operator\'s primary occupation is farming and gross value of sales less than $100,000',
        'Farming occupation/moderate-sales farms': 'Operator\'s primary occupation is farming and gross value of sales from $100,000 to $249,999',
        'Large farms': 'Gross value of sales from $250,000 to $499,999',
        'Very large farms': 'Gross value of sales equal to or greater than $500,000',
        'Nonfamily farms': 'Farms where the majority of business not owned by the operator and individuals related to the operator.',

      }
    },
    'Operator age' : {
      'menu': 'Data shown is classified into one of five exclusive categories based on the age of the farm\'s principal operator',
      'category': {
        '34 years or younger': 'Principal operator\'s age is 34 years or younger',
        '35 to 44 years old': 'Principal operator\'s age is 35 to 44',
        '45 to 54 years old': 'Principal operator\'s age is 45 to 54',
        '55 to 64 years old': 'Principal operator\'s age is 55 to 64',
        '65 years or older': 'Principal operator\'s age is 65 or older'
      }
    },
    'Farm Resource Region': {
      'menu': 'Data shown classifies the contiguous U.S. in nine exlusive regions in terms of geographic specialization in production of U.S. farm commodities - see https://www.ers.usda.gov/publications/pub-details/?pubid=42299',
      'category': {
        'Heartland': 'Heartland region',
        'Northern Crescent': 'Northern Crescent region',
        'Northern Great Plains': 'Northern Great Plains region',
        'Prairie Gateway': 'Prairie Gateway region',
        'Eastern Uplands': 'Eastern Uplands region',
        'Southern Seaboard': 'Southern Seaboard region',
        'Fruitful Rim': 'Fruitful Rim region',
        'Basin and Range': 'Basin and Range region',
        'Mississippi Portal': 'Mississippi Portal region'
      }
    },
    'NASS region': {
      'menu': 'Data shown classifies the contiguous U.S. in 5 exclusive regions of adjoining states',
      'category': {
        'Atlantic Region': 'Includes states of Connecticut, Delaware, Kentucky, Maine, Maryland, Massachusetts, New Hampshire, New Jersey, New York, North Carolina, Pennsylvania, Rhode Island, Tennessee, Vermont, Virginia, West Virginia',
        'South region': 'Includes states of Alabama, Arkansas, Florida, Georgia, Louisiana, Mississippi, and South Carolina',
        'Midwest region': 'Includes states of Illinois, Indiana, Iowa, Michigan, Minnesota, Missouri, Ohio, and Wisconsin',
        'Plains region': 'Includes states of Kansas, Nebraska, North Dakota, Oklahoma, South Dakota, and Texas',
        'West region': 'Includes states of Arizona, California, Colorado, Idaho, Montana, Nevada, New Mexico, Oregon, Utah, Washington, and Wyoming'
      }
    },
    'Production Specialty': {
      'menu': 'Data shown classifies farms based on majority of the value of production',
      'category': {
        'Tobacco, cotton, peanuts': 'Includes combined value of production from tobacco, cotton, and peanuts',
        'Other field crops': 'Includes combined value of production from barley, corn, cotton, rice, sorghum, soybean, wheat, vegetables, fruit, and nursery, canola, corn silage, flaxseed, lentils, mustard seed, oats, rapeseed, rye, oats, sorghum silage, sunflowers, safflower, other',
        'Cattle': 'Includes combined value of production from beef cattle and calves of all ages',
        'Dairy': 'Includes combined value of production from dairy animals and animal products',
        'Hogs, poultry, other': 'Includes combined value of production from hogs, broiler, eggs, and fish',
        'Fruit and tree nuts': 'Includes combined value of production from fruit and tree nuts', 
        'Vegetables': 'Includes combined value of production from fresh and processing vegetables and melons, including potatoes, beans, peas, and sweet potatoes',
        'Nursery and greenhouse': 'Includes combined value of production from nursery and greenhouse crops under glass or out in the open',
        'All cash grains': 'Includes combined value of production from barley, beans, corns, flaxseed, lentils, oats, peas, rice, rye, sorghum, soybean, and wheat',
        'Specialty crops': 'Includes combined value of production from fruits, vegetables, and nursery',
        'All other livestock': 'Includes combined value of production from sheept, goats and their products; horses, ponies, mules, burrow, and donkeys; aquaculture; bees and honey; semen and embryo sales'
      }
    }
  }
}