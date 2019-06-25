'use strict';
//"Standard" -yllion series go up to centyllion
const ConvertStdYllion = n=> n<3?['ten','hundred','myriad'][n]:ConvertStdIllion(n-2).slice(0,-6).concat('yllion')//name of 10^2^n