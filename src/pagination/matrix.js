class Matrix
{
	constructor( d, data, )
	{
		this.d= d;
		this.data= new Array( d, ).fill( 0, ).map( ()=> new Array( d, ).fill( 0, ), );

		for( let i=0; i<d; ++i )
		for( let j=0; j<d; ++j )
		{
			this.data[i][j]= (
				(!data || !data[i] || isNaN( data[i][j], ))
				? (i===j ?1 :0)
				: data[i][j]
			);
		}
	}
};


Matrix.multiply= ( m1, m2, )=>{
	if( m1.d !== m2.d ) throw 'Dimension of two matrix must be the same.';

	const d= m1.d;
	const result= new Array( d, ).fill( 0, ).map( ()=> new Array( d, ).fill( 0, ), );

	for( let i=0; i<d; ++i )
	for( let j=0; j<d; ++j )
	for( let k=0; k<d; ++k )
	{
		result[i][j]+= m1.data[i][k] * m2.data[k][j];
	}

	return new Matrix( d, result, );
};

export default Matrix;
