var negativeProFinite = [10, 9, 8, 7, 6, 5, 4, 3, 2, 1];

$(document).ready( function(){
	$('#convertProFinite').click( function(){
		var form = $(this).parent();
		// Deel het pro-eindige getal op in meerdere getallen waarbij er gescheiden wordt per spatiie
		var profinite = form.find('.profinite-number')[0].value.split(' ');
		// Converteer het pro-eindige getal naar een geheel getal,
		//  nadat de volgorde van het pro-eindige getal is omgekeerd.
		var integer = toInteger(profinite.reverse());
		form.find('.integer')[0].value = integer;
		return false;
	});

	$('#convertInteger').click( function(){
		form = $(this).parent();
		integer = form.find('.integer')[0].value.split(' ');
		console.log(integer);
		// Zet het gehele getal om in in een pro-eindig getal
		factorial = toFactorial(integer);
		console.log(factorial);
		// Weergeef het verkregen pro-eindig getal
		form.find('.profinite-number')[0].value = factorial.join(' ');

		// Controlleer of het pro-eindige getal klopt
		integerCheck = toInteger(factorial.reverse());
		if (integer != integerCheck && integer >= 0)
		{
			alert('De berekende factorial waarde is niet correct.');
			console.log(integer);
			console.log(integerCheck);
		}

		return false;
	});

	$('#addProFinite').click( function(){
		form = $(this).parent();
		// Deel de pro-eindige getallen op in meerdere getallen waarbij er gescheiden wordt per spatiie
		proFiniteInteger1 = form.find('.profinite-number')[0].value.split(' ').reverse();
		proFiniteInteger2 = form.find('.profinite-number')[1].value.split(' ').reverse();
		// Convergeer de pro-eindige getallen naar een geheel getal
		integer1 = toInteger(proFiniteInteger1);
		integer2 = toInteger(proFiniteInteger2);

		newProFiniteInteger = toFactorial(integer1 + integer2);

		form.find('.result')[0].value = newProFiniteInteger.join(' ');
		return false;

	});

	$('#subtractProFinite').click( function(){
		form = $(this).parent();
		// Deel de pro-eindige getallen op in meerdere getallen waarbij er gescheiden wordt per spatiie
		proFiniteInteger1 = form.find('.profinite-number')[0].value.split(' ').reverse();
		proFiniteInteger2 = form.find('.profinite-number')[1].value.split(' ').reverse();
		// Convergeer de pro-eindige getallen naar een geheel getal
		integer1 = toInteger(proFiniteInteger1);
		integer2 = toInteger(proFiniteInteger2);

		newProFiniteInteger = toFactorial(integer1 - integer2);
		form.find('.result')[0].value = newProFiniteInteger.join(' ');
		return false;
	});

	$('#multiplyProFinite').click( function(){
		form = $(this).parent();
		proFiniteInteger1 = form.find('.profinite-number')[0].value.split(' ').reverse();
		proFiniteInteger2 = form.find('.profinite-number')[1].value.split(' ').reverse();

		integer1 = toInteger(proFiniteInteger1);
		integer2 = toInteger(proFiniteInteger2);


		newProFiniteInteger = toFactorial(integer1 * integer2);
		form.find('.result')[0].value = newProFiniteInteger.join(' ');
		return false;
	});
});

// Geef de eerste n elementen van de array een standaard value
Array.prototype.repeat= function(value, n){
 while(n) this[--n]= value;
 return this;
}
// Funcite voor faculteit
function fac(n)
{
	if (n <= 1) {
		return 1;
	} else {
		return fac(n - 1) * n;
	}
}

function fib(n)
{
	if (n == 0) {
		return 0;
	} else if (n == 1) {
		return 1;
	} else {
		return fib(n - 1) + fib(n - 2);
	}
}

function toInteger(proFinite)
{
	var integer = 0;
	var fac = 1;
	// int = som(c_i * i!)
	for (var i = 0; i < proFinite.length; i++) {
		fac = fac * (i + 1);
		integer += proFinite[i] * fac;
	};

	return integer;
}

// Dank aan http://answers.yahoo.com/question/index?qid=20090403075903AAjQOIz
function toFactorial(integer)
{
	if (integer < -1)
	{
		return toFactorial(toInteger(negativeProFinite) - integer + 1);
	} else if (integer == -1) {
		return negativeProFinite;
	}
	profiniteIntegerArray = [];
	// Bepaal de eerste faculteit die groter is dan het gegeven getal
	i = 1;
	while (fac(i) < integer)
	{
		i++;
	}
	// Als integer gelijk is aan fac(i), dan bestaat het pro-eindige getal uit i cijfers,
	//  waarbij het eerste cijfer een 1 is.
	if (integer == fac(i)) { 
		profiniteIntegerArray.repeat(0, i);
		profiniteIntegerArray[0] = 1;
	} else {
		// Sla de rest van integer mod fac(i) op
		var remainder = integer;
		while (fac(i) != 1)
		{
			// De volgende index is gelijk aan het aantal keer dat fac(i - 1) in de rest voorkomt
			var number = Math.floor(remainder / fac(i - 1));
			profiniteIntegerArray[profiniteIntegerArray.length] = number;
			// Sla de rest op en bepaal daaruit de volgende index
			remainder = remainder % fac(i - 1);
			i--;
		}
	}

	return profiniteIntegerArray;
}

function test(end, start)
{
	if (start == null){
		i = 1;
	} else {
		i = start;
	}
	console.log(i);
	while (i < end)
	{
		var number = i;
		var factorial = toFactorial(number);//.join(' ');
		var integerCheck = toInteger(factorial);

		if (number != integerCheck)
		{
			console.log('Fout:');
			console.log(number);
			console.log(factorial);
			console.log(integerCheck);
		}
		i++;
	}
	console.log('Klaar met testen');
}

function list(total)
{
	var i = 0;
	var proFiniteIntegers = [];
	while (i < total)
	{
		i++
		proFiniteIntegers[i] = toFactorial(i);
	}
	console.log(proFiniteIntegers);
	return proFiniteIntegers;
}

// Returns latex text to create a table
function listToLatex(list)
{
	text = '';
	for (var i = 0; i < list.length / 4; i++) {
		text += "\\hline ";
		for (var j = 0; j < 4; j++) {
			text += i * 4 + j + 1 + " & " + list[i * 4 + j + 1].join(' ') + " & ";
		};

		text += " \n";
		
	};
	return text;

}

function latexTable(n)
{
	text = '';
	for (var i = 1; i <= n; i++) {
		console.log(i + n);
		text += "\\hline " + i + " & " + toFactorial(i) + " & " + fib(i) +
		" & " + (i + n) + " & " + toFactorial(i + n).join(' ') + " & " + fib(i + n) +
		" & " + (i + 2*n) + " & " + toFactorial(i + 2*n).join(' ') + " & " + fib(i + 2*n) +
		' \\\\\n';
	};
	console.log(text);
	return text;
}