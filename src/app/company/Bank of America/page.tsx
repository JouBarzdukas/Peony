import CompanyPage from '../company-page'

export default function NVIDIApage() {
  const NVIDIAdata = {
    name: 'NVIDIA Corporation'
    headquarters: 'Santa Clara, California, USA'
  
  salaries: {
    entryLevel: {
      title: 'IC1',
      salary = '176000'
      number_of_swe = '2250'
      asian = '675'
      white = '1125'
      hispanic = '338'
      black = '113'
      other = '113'

    }
    midLevel: {
      title: 'IC2'
      salary = '215000'
      number_of_swe = '5500'
      asian = '1650'
      white = '2550'
      hispanic = '550'
      black = '375'
      other = '375'
    }
    seniorLevel: {
      title: 'IC3'
      salary = '281000'
      number_of_swe = '4500'
      asian = '1350'
      white = '2250'
      hispanic = '550'
      black = '225'
      other = '125'
    }
  }
  
    
  }

  return <CompanyPage companyData={NVIDIAdata} />;
}