const models = { // model structure of the defaultmodels
	SIR: '',
	SIS: '',
	SEIR: '',
	SIRS: '',
	SIRD: '',
	SIRV: '',
	MSEIR: '',
	SIHRD: '',
	SEIRVG: '',
}
const modelsvitaldynamics = { // model structure of the defaultmodels with vitaldynamics
	SIRvitaldynamics: '', // for every model there is necessarily a vitaldynamics version 
	SISvitaldynamics: '',
	SEIRvitaldynamics: '',
	SIRSvitaldynamics: '',
	SIRDvitaldynamics: '',
	SIRVvitaldynamics: '',
	MSEIRvitaldynamics: '',
	SIHRDvitaldynamics: '',
	SEIRVGvitaldynamics: '',
}

models.SIR = 'Epidemic-Model-Data\n';
models.SIR += 's0(100,100),1000,119878;s1(300,100),10,119868;s2(500,100),0,119877:\n';
models.SIR += '120573-(s1),s0,s1;120574,s1,s2:\n';
models.SIR += ':\n';
models.SIR += ':\n';
models.SIR += 't0-0:\n';
models.SIR += '120573,t0,0.3;120574,t0,0.1:';

models.SIS = 'Epidemic-Model-Data\n';
models.SIS += 's0(100,100),1000,119878;s1(300,100),10,119868:\n';
models.SIS += '120573-(s1),s0,s1;120574,s1,s0:\n';
models.SIS += ':\n';
models.SIS += ':\n';
models.SIS += 't0-0:\n';
models.SIS += '120573,t0,0.2;120574,t0,0.1:\n';

models.SEIR = 'Epidemic-Model-Data\n';
models.SEIR += 's0(100,100),1000,119878;s1(300,100),0,119864;s2(500,100),10,119868;s3(700,100),0,119877:\n';
models.SEIR += '120573-(s2),s0,s1;120572,s1,s2;120574,s2,s3:\n';
models.SEIR += ':\n';
models.SEIR += ':\n';
models.SEIR += 't0-0:\n';
models.SEIR += '120573,t0,0.3;120572,t0,0.1;120574,t0,0.1:\n';

models.SIRS = 'Epidemic-Model-Data\n';
models.SIRS += 's0(100,100),1000,119878;s1(300,100),10,119868;s2(450,300),0,119877:\n';
models.SIRS += '120573-(s1),s0,s1;120574,s1,s2;120591,s2,s0:\n';
models.SIRS += ':\n';
models.SIRS += ':\n';
models.SIRS += 't0-0:\n';
models.SIRS += '120573,t0,0.4;120574,t0,0.2;120591,t0,0.01:\n';

models.SIRD = 'Epidemic-Model-Data\n';
models.SIRD += 's0(100,200),1000,119878;s1(300,200),10,119868;s2(500,100),0,119877;s3(500,300),0,119863:\n';
models.SIRD += '120573-(s1),s0,s1;120574,s1,s2;120575,s1,s3:\n';
models.SIRD += ':\n';
models.SIRD += ':\n';
models.SIRD += 't0-0:\n';
models.SIRD += '120573,t0,0.3;120574,t0,0.1;120575,t0,0.005:\n';

models.SIRV = 'Epidemic-Model-Data\n';
models.SIRV += 's0(100,100),1000,119878;s1(300,100),10,119868;s2(500,100),0,119877;s3(200,200),0,119881:\n';
models.SIRV += '120573-(s1),s0,s1;120574,s1,s2;120575,s0,s3:\n';
models.SIRV += ':\n';
models.SIRV += ':\n';
models.SIRV += 't0-0:\n';
models.SIRV += '120573,t0,0.3;120574,t0,0.1;120575,t0,0.01:\n';

models.MSEIR = 'Epidemic-Model-Data\n';
models.MSEIR += 's0(100,100),100,119872;s1(300,100),900,119878;s2(500,100),0,119864;s3(700,100),1,119868;s4(900,100),0,119877:\n';
models.MSEIR += '120575,s0,s1;120573-(s3),s1,s2;120572,s2,s3;120574,s3,s4:\n';
models.MSEIR += ':\n';
models.MSEIR += ':\n';
models.MSEIR += 't0-0:\n';
models.MSEIR += '120575,t0,0.01;120573,t0,0.3;120572,t0,0.1;120574,t0,0.1:\n';

models.SIHRD = 'Epidemic-Model-Data\n';
models.SIHRD += 's0(250,50),1000,119878;s1(250,250),10,119868;maincstates2(400,400),100,119870;leftcstates3(250,550),0,119867;rightcstates4(550,550),0,119863;s5(100,400),0,119877:\n';
models.SIHRD += 'leftctransition120582,s2,s3;rightctransition120582,s2,s4;120573-(s1),s0,s1;120582,s1,s2;120581,s3,s5;120591,s1,s5:\n';
models.SIHRD += ':\n';
models.SIHRD += ':\n';
models.SIHRD += 't0-0:\n';
models.SIHRD += '120573,t0,0.5;120582,t0,0.11;120591,t0,0.1;120581,t0,0.1:\n';

models.SEIRVG = 'Epidemic-Model-Data\n';
models.SEIRVG += 's0(120,216),500,119878,8321;s1(307,212),0,119864,8321;s2(485,211),10,119868,8321;s3(482,341),0,119877,8321;s4(625,227),0,119866,8321;s5(133,458),500,119878,8322;s6(304,457),0,119864,8322;s7(485,461),10,119868,8322;s8(488,575),0,119877,8322;s9(650,462),0,119866,8322;s10(477,97),0,119881;s11(605,93),0,119881,119866:\n';
models.SEIRVG += '120573-(s2),s0,s1;120572,s1,s2;120574,s2,s3;120584,s3,s0;120583-+-120582,s3,s4;120581,s4,s3;120573-(s7),s5,s6;120572,s6,s7;120574,s7,s8;120584,s8,s5;120583,s8,s9;120581,s9,s8;120576,s10,s0;120580,s0,s10;120593-+-120596,s10,s11;120590,s11,s10:\n';
models.SEIRVG += ':\n';
models.SEIRVG += ':\n';
models.SEIRVG += 't0-0,t1-50:\n';
models.SEIRVG += '120573,t0,0.3;120573,t1,0.3;120584,t0,0.05;120584,t1,0.05;120572,t0,0.3;120572,t1,0.3;120574,t0,0.07;120574,t1,0.07;120583,t0,0.05;120583,t1,0.05;120581,t0,0.1;120581,t1,0.1;120576,t0,0.1;120576,t1,0.1;120580,t0,0;120580,t1,0.3;120593,t0,0.1;120593,t1,0.001;120590,t0,0.1;120590,t1,0.1;120582,t0,0.01;120582,t1,0.01;120596,t0,0.05;120596,t1,0.05:\n';


modelsvitaldynamics.SIRvitaldynamics = 'Epidemic-Model-Data\n';
modelsvitaldynamics.SIRvitaldynamics += 's0(100,100),1000,119878;s1(300,100),10,119868;s2(500,100),0,119877:\n';
modelsvitaldynamics.SIRvitaldynamics += '120573-(s1),s0,s1;120574,s1,s2:\n';
modelsvitaldynamics.SIRvitaldynamics += '120583-(n),s0:\n';
modelsvitaldynamics.SIRvitaldynamics += '120584-(s0),s0;120584-(s1),s1;120584-(s2),s2:\n';
modelsvitaldynamics.SIRvitaldynamics += 't0-0:\n';
modelsvitaldynamics.SIRvitaldynamics += '120573,t0,0.3;120574,t0,0.1;120583,t0,0.01;120584,t0,0.01:\n';

modelsvitaldynamics.SISvitaldynamics = 'Epidemic-Model-Data\n';
modelsvitaldynamics.SISvitaldynamics += 's0(100,100),1000,119878;s1(300,100),10,119868:\n';
modelsvitaldynamics.SISvitaldynamics += '120573-(s1),s0,s1;120574,s1,s0:\n';
modelsvitaldynamics.SISvitaldynamics += '120583-(n),s0:\n';
modelsvitaldynamics.SISvitaldynamics += '120584-(s0),s0;120584-(s1),s1:\n';
modelsvitaldynamics.SISvitaldynamics += 't0-0:\n';
modelsvitaldynamics.SISvitaldynamics += '120573,t0,0.2;120574,t0,0.1;120583,t0,0.001;120584,t0,0.001:\n';

modelsvitaldynamics.SEIRvitaldynamics = 'Epidemic-Model-Data\n';
modelsvitaldynamics.SEIRvitaldynamics += 's0(100,100),1000,119878;s1(300,100),0,119864;s2(500,100),10,119868;s3(700,100),0,119877:\n';
modelsvitaldynamics.SEIRvitaldynamics += '120573-(s2),s0,s1;120572,s1,s2;120574,s2,s3:\n';
modelsvitaldynamics.SEIRvitaldynamics += '120583-(n),s0:\n';
modelsvitaldynamics.SEIRvitaldynamics += '120584-(s0),s0;120584-(s1),s1;120584-(s2),s2;120584-(s3),s3:\n';
modelsvitaldynamics.SEIRvitaldynamics += 't0-0:\n';
modelsvitaldynamics.SEIRvitaldynamics += '120573,t0,0.3;120572,t0,0.1;120574,t0,0.1;120583,t0,0.001;120584,t0,0.001:\n';

modelsvitaldynamics.SIRSvitaldynamics = 'Epidemic-Model-Data\n';
modelsvitaldynamics.SIRSvitaldynamics += 's0(100,100),1000,119878;s1(300,100),10,119868;s2(450,300),0,119877:\n';
modelsvitaldynamics.SIRSvitaldynamics += '120573-(s1),s0,s1;120574,s1,s2;120591,s2,s0:\n';
modelsvitaldynamics.SIRSvitaldynamics += '(n)-120583,s0:\n';
modelsvitaldynamics.SIRSvitaldynamics += '120584-(s0),s0;120584-(s1),s1;120584-(s2),s2:\n';
modelsvitaldynamics.SIRSvitaldynamics += 't0-0:\n';
modelsvitaldynamics.SIRSvitaldynamics += '120573,t0,0.4;120574,t0,0.2;120591,t0,0.01;120583,t0,0.001;120584,t0,0.001:\n';

modelsvitaldynamics.SIRDvitaldynamics = 'Epidemic-Model-Data\n';
modelsvitaldynamics.SIRDvitaldynamics += 's0(100,200),1000,119878;s1(300,200),10,119868;s2(500,100),0,119877;s3(500,300),0,119863:\n';
modelsvitaldynamics.SIRDvitaldynamics += '120573-(s1),s0,s1;120574,s1,s2;120575,s1,s3:\n';
modelsvitaldynamics.SIRDvitaldynamics += '120583-(s0)-+-120583-(s1)-+-120583-(s2),s0:\n';
modelsvitaldynamics.SIRDvitaldynamics += '120584-(s0),s0;120584-(s1),s1;120584-(s2),s2:\n';
modelsvitaldynamics.SIRDvitaldynamics += 't0-0:\n';
modelsvitaldynamics.SIRDvitaldynamics += '120573,t0,0.3;120574,t0,0.1;120575,t0,0.005;120583,t0,0.01;120584,t0,0.01:\n';

modelsvitaldynamics.SIRVvitaldynamics = 'Epidemic-Model-Data\n';
modelsvitaldynamics.SIRVvitaldynamics += 's0(100,100),1000,119878;s1(300,100),10,119868;s2(500,100),0,119877;s3(200,200),0,119881:\n';
modelsvitaldynamics.SIRVvitaldynamics += '120573-(s1),s0,s1;120574,s1,s2;120575,s0,s3:\n';
modelsvitaldynamics.SIRVvitaldynamics += '120583-(n),s0:\n';
modelsvitaldynamics.SIRVvitaldynamics += '120584-(s0),s0;120584-(s1),s1;120584-(s2),s2;120584-(s3),s3:\n';
modelsvitaldynamics.SIRVvitaldynamics += 't0-0:\n';
modelsvitaldynamics.SIRVvitaldynamics += '120573,t0,0.3;120574,t0,0.1;120575,t0,0.01;120583,t0,0.01;120584,t0,0.01:\n';

modelsvitaldynamics.MSEIRvitaldynamics = 'Epidemic-Model-Data\n';
modelsvitaldynamics.MSEIRvitaldynamics += 's0(100,100),100,119872;s1(300,100),900,119878;s2(500,100),0,119864;s3(700,100),1,119868;s4(900,100),0,119877:\n';
modelsvitaldynamics.MSEIRvitaldynamics += '120575,s0,s1;120573-(s3),s1,s2;120572,s2,s3;120574,s3,s4:\n';
modelsvitaldynamics.MSEIRvitaldynamics += '120583-(s0)-+-120583-(s2)-+-120583-(s3)-+-120583-(s4),s0;120583-(s1),s1:\n';
modelsvitaldynamics.MSEIRvitaldynamics += '120584-(s0),s0;120584-(s1),s1;120584-(s2),s2;120584-(s3),s3;120584-(s4),s4:\n';
modelsvitaldynamics.MSEIRvitaldynamics += 't0-0:\n';
modelsvitaldynamics.MSEIRvitaldynamics += '120575,t0,0.01;120573,t0,0.3;120572,t0,0.1;120574,t0,0.1;120583,t0,0.001;120584,t0,0.001:\n';

modelsvitaldynamics.SIHRDvitaldynamics = 'Epidemic-Model-Data\n'
modelsvitaldynamics.SIHRDvitaldynamics += 's0(139,118),1000,119878;s1(250,250),10,119868;maincstates2(400,400),100,119870;leftcstates3(250,550),0,119867;rightcstates4(550,550),0,119863;s5(100,400),0,119877:\n'
modelsvitaldynamics.SIHRDvitaldynamics += 'leftctransition120582,s2,s3;rightctransition120582,s2,s4;120573-(s1),s0,s1;120582,s1,s2;120581,s3,s5;120591,s1,s5:\n'
modelsvitaldynamics.SIHRDvitaldynamics += '120583-(s0)-+-120583-(s1)-+-120583-(s3)-+-120583-(s5),s0:\n'
modelsvitaldynamics.SIHRDvitaldynamics += '120584-(s1),s1;120584-(s0),s0;120584-(s5),s5;120584-(s3),s3:\n'
modelsvitaldynamics.SIHRDvitaldynamics += 't0-0:\n'
modelsvitaldynamics.SIHRDvitaldynamics += '120573,t0,0.7;120582,t0,0.11;120591,t0,0.1;120581,t0,0.1;120583,t0,0.1;120584,t0,0.1:\n'


modelsvitaldynamics.SEIRVGvitaldynamics = 'Epidemic-Model-Data\n';
modelsvitaldynamics.SEIRVGvitaldynamics += 's0(123,231),500,119878,8321;s1(307,227),0,119864,8321;s2(482,228),10,119868,8321;s3(564,336),0,119877,8321;s4(625,227),0,119866,8321;s5(121,458),500,119878,8322;s6(304,457),0,119864,8322;s7(485,461),10,119868,8322;s8(560,556),0,119877,8322;s9(650,462),0,119866,8322;s10(477,97),0,119881;s11(615,94),0,119881,119866:\n';
modelsvitaldynamics.SEIRVGvitaldynamics += '120573-(s2),s0,s1;120572,s1,s2;120574,s2,s3;120584,s3,s0;120583-+-120582,s3,s4;120581,s4,s3;120573-(s7),s5,s6;120572,s6,s7;120574,s7,s8;120584,s8,s5;120583,s8,s9;120581,s9,s8;120576,s10,s0;120580,s0,s10;120593-+-120596,s10,s11;120590,s11,s10:\n';
modelsvitaldynamics.SEIRVGvitaldynamics += '120595-(n),s5:\n';
modelsvitaldynamics.SEIRVGvitaldynamics += '120577-(s5),s5;120577-(s6),s6;120577-(s7),s7;120577-(s9),s9;120577-(s8),s8;120577-(s0),s0;120577-(s1),s1;120577-(s10),s10;120577-(s3),s3;120577-(s4),s4;120577-(s11),s11;120577-(s2),s2:\n';
modelsvitaldynamics.SEIRVGvitaldynamics += 't0-0,t1-50:\n';
modelsvitaldynamics.SEIRVGvitaldynamics += '120573,t0,0.3;120573,t1,0.3;120584,t0,0.05;120584,t1,0.05;120572,t0,0.3;120572,t1,0.3;120574,t0,0.07;120574,t1,0.07;120583,t0,0.05;120583,t1,0.05;120581,t0,0.1;120581,t1,0.1;120576,t0,0.1;120576,t1,0.1;120580,t0,0;120580,t1,0.3;120593,t0,0.1;120593,t1,0.001;120590,t0,0.1;120590,t1,0.1;120582,t0,0.01;120582,t1,0.01;120596,t0,0.05;120596,t1,0.05;120595,t0,0.00001;120595,t1,0.00001;120577,t0,0.00001;120577,t1,0.00001:\n';


export {models, modelsvitaldynamics};