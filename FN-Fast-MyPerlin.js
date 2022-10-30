function Lerp(a,b,t){
	return (b-a)*((t*(t*6.0-15.0)+10.0)*t*t*t)+a//smoother
	//return (b-a)*(3.0-t*2.0)*t*t+a//smooth
	//return (b-a)*t+a//normal
}

class FractalNoise {
	constructor (Z,O,F,A,L,P) {
		this.Seed = Z || Math.random()*9999999999999+9999999999
		
		this.Octaves = O || 3
		this.Frequency = F || .05
		this.Amplitude = A || 1

		this.Lacunarity = L || .1//freq
		this.Persistence = P || .3
	}

	Noise2D (x,y) {
		const {
	    cos,
    	sin,
	    PI,
	    floor
    } = Math
    const rad = PI/180
		let v=0,
		  f=this.Frequency,
		  am=this.Amplitude;
		for(let i=0;i!==this.Octaves;i++){
	let xx=x*f,
	  yy=y*f,
    px=floor(xx),
  	py=floor(yy),
    x1 = px + 1,
    y1 = py + 1,
  	sx=xx-px;

f*=this.Lacunarity
			
v+=Lerp(
	Lerp(
		this.DotProduct(px,py,xx,yy),
		this.DotProduct(x1,py,xx,yy),
		sx
	),
	Lerp(
		this.DotProduct(px,y1,xx,yy),
		this.DotProduct(x1,y1,xx,yy),
		sx
	),
	yy-py
)*am
am*=this.Persistence
		}
		return (v/this.Octaves)*.5+.5
	}

	DotProduct (ix,iy,x,y) {
		let a=this.RanGradient(ix,iy),
		  b=x-ix,
		  c=y-iy;
		return b*a.x+c*a.y
	}

	RanGradient (x,y) {
		//
    let a=sin(x^y+cos(x+y)+sin(x.toString(2)+y.toString(2)))*9999999,
	  b=sin(cos(y^x)+~a.toString(2)+cos(x+~y)*9999)*9999999;
	  a^=b^this.Seed
	  b=(a%360)*rad
	  return{x:cos(b),y:sin(b)}
	}
	
}
