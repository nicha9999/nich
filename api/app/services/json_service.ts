
export default class JsonService {
  
    public async jsonData(params: any) {
      const tokens: any[] = params.data || []
  
      const search: string | null = params.search
      const sort: string = params.sort
      const order: string =   params.order 
      const page: number = params.page ? parseInt(params.page) : 0 
      const size: number = params.size ? parseInt(params.size) : 10
  
      let data: any[] = JSON.parse(JSON.stringify(tokens))
  
      data.sort((a, b) => {
        
        if (!(sort in a) || !(sort in b)) {
          return 0;
          
        }
        
        const fieldA = a[sort] ? a[sort].toString().toUpperCase() : '';
        const fieldB = b[sort] ? b[sort].toString().toUpperCase() : '';
      
        return order === 'asc' ? fieldA.localeCompare(fieldB) : fieldB.localeCompare(fieldA);
      });
      if (search && search.trim() !== '') {
        data = data.filter(token => {
          const values = Object.values(token);
          return values.some(value => typeof value === 'string' && value.toLowerCase().includes(search.toLowerCase()));
        });
      }
  
      const tokensLength = data.length

      const begin = page * size
      const end = Math.min(size * (page + 1), tokensLength)
      const lastPage = Math.max(Math.ceil(tokensLength / size), 1)
  
      let pagination: Record<string, any> = {}
  
      if (page > lastPage) {
        data = []
        pagination = { lastPage }
      } else {
        data = data.slice(begin, end)
  
        pagination = {
          length: tokensLength,
          size,
          page,
          lastPage,
          startIndex: begin,
          endIndex: end - 1,
        }
      }
      return {
        data,
        pagination,
      }
    }
  }
  