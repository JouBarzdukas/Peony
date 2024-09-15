import CompanyPage from '../company-page'

export default function NVIDIApage() {
  const NVIDIAdata = {
    name: 'NVIDIA Corporation'
    headquarters: 'Santa Clara, California, USA'
  
  salaries: {
    entryLevel: {
      title: 'IC1',
      salary = '176000'
      ethnicity = 'Hispanic'
    }
    midLevel: {
      title: 'IC2'
      salary = '215000'
      ethnicity = 'White'
    }
    seniorLevel: {
      title: 'IC3'
      salary = '281000'
      ethnicity = 'Asian'
    }
  }
  
    
  }

  return <CompanyPage companyData={NVIDIAdata} />;
}