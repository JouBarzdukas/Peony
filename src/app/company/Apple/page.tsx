import CompanyPage from '../company-page'

export default function Applepage() {
  const Appledata = {
    name: 'Apple Inc'
    headquarters: 'Cupertino, California, USA'
  
  salaries: {
    entryLevel: {
      title: 'IC2',
      salary = '147000'
      number_of_swe = '15000'
      asian = '4500'
      white = '6500'
      hispanic = '1500'
      black = '1250'
      other = '1250'

    }
    midLevel: {
      title: 'IC3'
      salary = '235000'
      number_of_swe = '28000'
      asian = '8400'
      white = '14000'
      hispanic = '3000'
      black = '2000'
      other = '600'
    }
    seniorLevel: {
      title: 'IC4'
      salary = '333000'
      number_of_swe = '23000'
      asian = '6900'
      white = '11500'
      hispanic = '2700'
      black = '1500'
      other = '400'
     }
  }
}

return <CompanyPage companyData={Appledata} />;
}