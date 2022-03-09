const models = { // model structure of the defaultmodels
	SIR: '',
	SIS: '',
	SEIR: '',
	SIRS: '',
	SIRD: '',
	SIRV: '',
	MSEIR: '',
}
const modelsvitaldynamics = { // model structure of the defaultmodels with vitaldynamics
	SIRvitaldynamics: '', // for every model there is necessarily a vitaldynamics version 
	SISvitaldynamics: '',
	SEIRvitaldynamics: '',
	SIRSvitaldynamics: '',
	SIRDvitaldynamics: '',
	SIRVvitaldynamics: '',
	MSEIRvitaldynamics: '',
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


export {models, modelsvitaldynamics};