import Matrix from './matrix'

export default class View
{
	constructor()
	{
		this.matrix= new Matrix( 3, );
	}

	render()
	{
		return `matrix(${this.matrix.data[0][0]},${this.matrix.data[1][0]},${this.matrix.data[0][1]},${this.matrix.data[1][1]},${this.matrix.data[0][2]},${this.matrix.data[1][2]})`;
	}

	transform( matrix, before=true, )
	{
		this.matrix= (
			before
			? Matrix.multiply( new Matrix( 3, matrix, ), this.matrix, )
			: Matrix.multiply( this.matrix, new Matrix( 3, matrix, ), )
		);

		return this.render();
	}

	move( dx, dy, )
	{
		return this.transform(
			[
				[  1,  0, dx, ],
				[  0,  1, dy, ],
				[  0,  0,  1, ],
			],
		);
	}

	scale( times, ox=0, oy=0, )
	{

		return this.transform(
			[
				[ times,     0, ox-ox*times, ],
				[     0, times, oy-oy*times, ],
				[     0,     0,           1, ],
			],
		);
	}

	rotate( angle )
	{

		return this.transform(
			[
				[ +cos( angle, ), +sin( angle, ), 0, ],
				[ -sin( angle, ), +cos( angle, ), 0, ],
				[              0,              0, 1, ],
			],
		);

	}

	reset()
	{
		this.matrix= new Matrix( 3, );

		return this.render();
	}
}
