import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the MovieDatabaseProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class MovieDatabaseProvider {

	apiKey : String = "592d2665d929bc693a5ef6ece254bf2a";	
	page: number = 1;
	pelicula: any = null;
	pelis: any = null;
	pelisP: any = null;
	pelisMV: any = null;
	pelisMT: any = null;
	pelisDA: any = null;
	pelisDD: any = null;
  cast: any = null;
  generosPelis: any = null;
  proximas: any = null;
  cartelera: any = null;

  serie: any = null;
	series: any = null;
	seriesP: any = null;
	seriesMV :any = null;
	seriesDA: any = null;
  generosSeries: any = null;
  enEmision: any = null;
  emitenHoy: any = null;

  gente: any = null;
  actor: any = null;
  actuaciones: any = null;

  constructor(public http: Http) {
  }

  ///////////////PELICULAS\\\\\\\\\\\\\\\\\\\\\\\\\\\

  buscarPelicula(pelicula:string,start:number){
  	this.page = start;
  	return new Promise <Array<Object>> (resolve => {
  		this.http.get('https://api.themoviedb.org/3/search/movie?api_key='+this.apiKey+
		'&language=es-ES&query='+pelicula+'&page='+this.page+'&include_adult=false')
  		.map(res => res.json())
  		.subscribe(data => {
  			this.pelis = data;
  			resolve(this.pelis);
  		});
  	});
  }

  peliculasPorCategoria(genero:number, start: number){//ordenadas por popularidad
    this.page = start;
    return new Promise <Array<Object>> (resolve => {
      this.http.get('https://api.themoviedb.org/3/discover/movie?api_key='+this.apiKey+
        '&language=es-ES&sort_by=popularity.desc&include_adult=false&include_video=false&page='+this.page+'&with_genres='+genero)
      .map(res => res.json())
      .subscribe(data => {
        this.pelis = data;
        resolve(this.pelis);
      });
    });
  }

  getDetallesPelicula(idPelicula:number){
  	return new Promise <Object> (resolve => {
  		this.http.get('https://api.themoviedb.org/3/movie/'+idPelicula+'?api_key='+this.apiKey+'&language=es-ES')
  		.map(res => res.json())
  		.subscribe(data => {
  			this.pelicula = data;
  			resolve(this.pelicula);
  		});
  	});
  }

  getPeliculas(start:number){
  	this.page = start;
  	return new Promise <Array<Object>> (resolve => {
  		this.http.get('https://api.themoviedb.org/3/discover/movie?api_key='+this.apiKey+
  			'&language=es-ES&region=ES&sort_by=popularity.desc&certification_country=ES&include_adult=false&include_video=false&page='+this.page)
  		.map(res => res.json())
  		.subscribe(data => {
  			this.pelis = data;
  			resolve(this.pelis);
  		});
  	});
  }

  getPeliculasPopulares(start:number){
  	this.page = start;
  	return new Promise <Array<Object>> (resolve => {
  		this.http.get('https://api.themoviedb.org/3/movie/popular?api_key='+this.apiKey+
  			'&language=es-ES&page='+this.page)
  		.map(res => res.json())
  		.subscribe(data => {
  			this.pelisP = data;
  			resolve(this.pelisP);
  		});
  	});
  }

  getPeliculasMejorValoradas(start:number){
  	this.page = start;
	return new Promise <Array<Object>> (resolve => {
  		this.http.get('https://api.themoviedb.org/3/movie/top_rated?api_key='+this.apiKey+
  			'&language=es-ES&page='+this.page)
  		.map(res => res.json())
  		.subscribe(data => {
  			this.pelisP = data;
  			resolve(this.pelisP);
  		});
  	});
  }

  getPeliculasMasTaquilleras(start:number){
  	this.page = start;
  	return new Promise <Array<Object>> (resolve => {
  		this.http.get('https://api.themoviedb.org/3/discover/movie?api_key='+this.apiKey+
  			'&language=es-ES&sort_by=revenue.desc&'+
  			'include_adult=false&include_video=false&page='+this.page)
  		.map(res => res.json())
  		.subscribe(data => {
  			this.pelisP = data;
  			resolve(this.pelisP);
  		});
  	});
  }

  getPeliculasDateAsc(start:number){
  	this.page = start;
  	return new Promise <Array<Object>> (resolve => {
  		this.http.get('https://api.themoviedb.org/3/discover/movie?api_key='+this.apiKey+
  			'&language=es-ES&sort_by=release_date.asc&include_adult=false'+
  			'&include_video=false&page='+this.page)
  		.map(res => res.json())
  		.subscribe(data => {
  			this.pelisP = data;
  			resolve(this.pelisP);
  		});
  	});
  }

   getCastPelicula(id: number){
    return new Promise <Object> (resolve => {
      this.http.get('https://api.themoviedb.org/3/movie/'+id+'/credits?api_key='+this.apiKey)
      .map(res => res.json())
      .subscribe(data => {
        this.cast = data;
        resolve(this.cast);
      });
    });
  }

  getGenerosPeliculas(){
    return new Promise <Object> (resolve => {
      this.http.get('https://api.themoviedb.org/3/genre/movie/list?api_key='+this.apiKey+
        '&language=es-ES')
      .map(res => res.json())
      .subscribe(data => {
        this.generosPelis = data;
        resolve(this.generosPelis);
      });
    });
  }

  getProximasPeliculas(start: number){
    this.page = start;
    return new Promise <Object> (resolve => {
      this.http.get('https://api.themoviedb.org/3/movie/upcoming?api_key='+this.apiKey+
        '&language=es-ES&page='+this.page+'&region=ES')
      .map(res => res.json())
      .subscribe(data => {
        this.proximas = data;
        resolve(this.proximas);
      });
    });
  }

  getPeliculasCartelera(start: number){
    this.page = start;
    return new Promise <Object> (resolve => {
      this.http.get('https://api.themoviedb.org/3/movie/now_playing?api_key='+this.apiKey+
        '&language=es-ES&page='+this.page+'&region=ES')
      .map(res => res.json())
      .subscribe(data => {
        this.cartelera = data;
        resolve(this.cartelera);
      });
    });
  }

  ///////////////////SERIES\\\\\\\\\\\\\\\\\\\\\\\\

  buscarSerie(serie:string, start:number){
  	this.page = start;
  	return new Promise <Array<Object>> (resolve => {
  		this.http.get('https://api.themoviedb.org/3/search/tv?api_key='+this.apiKey+
  			'&language=es-ES&query='+serie+'&page='+this.page)
  		.map(res => res.json())
  		.subscribe(data => {
  			this.series = data;
  			resolve(this.series);
  		});
  	});
  }

  seriesPorCategoria(genero:number, start: number){
    this.page = start;
    return new Promise <Array<Object>> (resolve => {
      this.http.get('https://api.themoviedb.org/3/discover/tv?api_key='+this.apiKey+
        '&language=es-ES&sort_by=popularity.desc&page='+this.page+'&timezone=Spain%2FMadrid&with_genres='+genero+'&include_null_first_air_dates=false')
      .map(res => res.json())
      .subscribe(data => {
        this.series = data;
        resolve(this.series);
      });
    });
  }

  getDetallesSerie(idSerie:number){
    return new Promise <Object> (resolve => {
      this.http.get('https://api.themoviedb.org/3/tv/'+idSerie+'?api_key='+this.apiKey+
        '&language=es-ES')
      .map(res => res.json())
      .subscribe(data => {
        this.serie = data;
        resolve(this.serie);
      });
    });
  }

  getSeries(start:number){
  	this.page = start;
  	return new Promise <Array<Object>> (resolve => {
  		this.http.get('https://api.themoviedb.org/3/discover/tv?api_key='+this.apiKey+
  			'&language=es-ES&sort_by=popularity.desc&page='+this.page+'&timezone=Spain%2FSalamanca&include_null_first_air_dates=false')
  		.map(res => res.json())
  		.subscribe(data => {
  			this.series = data;
  			resolve(this.series);
  		});
  	});
  }

getSeriesPopulares(start:number){
	this.page = start;
  	return new Promise <Array<Object>> (resolve => {
  		this.http.get('https://api.themoviedb.org/3/tv/popular?'+
  			'api_key='+this.apiKey+'&language=es-ES&page='+this.page)
  		.map(res => res.json())
  		.subscribe(data => {
  			this.seriesP = data;
  			resolve(this.seriesP);
  		});
  	});
  }

  getSeriesMejorValoradas(start:number){
  	this.page = start;
  	return new Promise <Array<Object>> (resolve => {
  		this.http.get('https://api.themoviedb.org/3/tv/top_rated?api_key='+this.apiKey+
  			'&language=es-ES&page='+this.page)
  		.map(res => res.json())
  		.subscribe(data => {
  			this.seriesMV = data;
  			resolve(this.seriesMV);
  		});
  	});
  }

  getSeriesDateAsc(start:number){
  	this.page = start;
  	return new Promise <Array<Object>> (resolve => {
  		this.http.get('https://api.themoviedb.org/3/discover/tv?api_key='+this.apiKey+
  			'&language=es-ES&sort_by=first_air_date.asc&page='+this.page+'&timezone=Spain%2FSalamanca&include_null_first_air_dates=false')
  		.map(res => res.json())
  		.subscribe(data => {
  			this.seriesDA = data;
  			resolve(this.seriesDA);
  		});
  	});
  }

  getCastSerie(id: number){
    return new Promise <Object> (resolve => {
      this.http.get('https://api.themoviedb.org/3/tv/'+id+'/credits?api_key='+this.apiKey+'&language=es-ES')
      .map(res => res.json())
      .subscribe(data => {
        this.cast = data;
        resolve(this.cast);
      });
    });
  }

  getGenerosSeries(){
    return new Promise <Object> (resolve => {
      this.http.get('https://api.themoviedb.org/3/genre/tv/list?api_key='+this.apiKey+'&language=es-ES')
      .map(res => res.json())
      .subscribe(data => {
        this.generosSeries = data;
        resolve(this.generosSeries);
      });
    });
  }

  getSeriesEnEmision(start: number){
    this.page = start;
    return new Promise <Array<Object>> (resolve => {
      this.http.get('https://api.themoviedb.org/3/tv/on_the_air?api_key='+this.apiKey+
        '&language=es-ES&page='+this.page)
      .map(res => res.json())
      .subscribe(data => {
        this.enEmision = data;
        resolve(this.enEmision);
      });
    });
  }

  getEmisionHoy(start: number){
    this.page = start;
    return new Promise <Array<Object>> (resolve => {
      this.http.get('https://api.themoviedb.org/3/tv/airing_today?api_key='+this.apiKey+
        '&language=es-ES&page='+this.page)
      .map(res => res.json())
      .subscribe(data => {
        this.emitenHoy = data;
        resolve(this.emitenHoy);
      });
    });
  }

   ///////////////////GENTE\\\\\\\\\\\\\\\\\\\\\\\\

   buscarActor(actor: string, start:number){
    this.page = start;
    return new Promise <Array<Object>> (resolve => {
      this.http.get('https://api.themoviedb.org/3/search/person?api_key='+this.apiKey+
        '&language=es-ES&query='+actor+'&page='+this.page+'&include_adult=false')
      .map(res => res.json())
      .subscribe(data => {
        this.actor = data;
        resolve(this.actor);
      });
    });
   }

   getGentePopular(start: number){
     this.page = start;
     return new Promise <Array<Object>> (resolve => {
      this.http.get('https://api.themoviedb.org/3/person/popular?api_key='+this.apiKey+
        '&language=es-ES&page='+this.page)
      .map(res => res.json())
      .subscribe(data => {
        this.gente = data;
        resolve(this.gente);
      });
    });
   }

   getInformacionActor(id: number){
     return new Promise <Object> (resolve => {
      this.http.get('https://api.themoviedb.org/3/person/'+id+'?'+
        'api_key='+this.apiKey+'&language=es-ES')
      .map(res => res.json())
      .subscribe(data => {
        this.actor = data;
        resolve(this.actor);
      });
    });
   }

   getActuacionesActor(id: number){
     return new Promise <Array<Object>> (resolve => {
      this.http.get('https://api.themoviedb.org/3/person/'+id+'/combined_credits?api_key='+this.apiKey+
        '&language=es-ES')
      .map(res => res.json())
      .subscribe(data => {
        this.actuaciones = data;
        resolve(this.actuaciones);
      });
    });
   }

}
