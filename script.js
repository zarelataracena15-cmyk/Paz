/* =========================================================
   ANTES DE JUZGAR — aplicación artística ODS 16
   Conceptos demostrados:
   variables, arreglos, operadores, funciones, selección,
   ciclos, aleatoriedad, estructuras, modularidad,
   parametrización, imágenes/forma digital, animación,
   interfaz y navegación.
========================================================= */

const state = {
  step: 0,
  score: 0,
  choices: [],
  empathy: 0,
  action: 0,
  dialogue: 0
};

const scenes = [
  {
    title: "Una tarde en Puebla",
    text: "No conoces a las personas involucradas. Antes de actuar, puedes decidir qué hacer con la información que tienes.",
    bubble: "Escuchas una discusión. Una persona acusa a otra de haber tomado algo que no le pertenece.",
    options: [
      {label:"Juzgar inmediatamente", score:-2, empathy:-1, action:0, dialogue:0, msg:"Has tomado una decisión antes de conocer toda la historia."},
      {label:"Observar y escuchar", score:2, empathy:2, action:0, dialogue:1, msg:"Decides obtener más información antes de señalar a alguien."},
      {label:"Buscar a alguien que pueda ayudar", score:1, empathy:1, action:2, dialogue:0, msg:"Reconoces que el conflicto puede necesitar una mediación."}
    ]
  },
  {
    title: "Dos versiones",
    text: "Ahora escuchas a ambas personas. Sus versiones no coinciden y cada una interpreta el hecho de manera distinta.",
    bubble: "“Yo vi lo que pasó”, dice una. “No es como parece”, responde la otra.",
    options: [
      {label:"Creer a quien habla más fuerte", score:-1, empathy:-1, action:0, dialogue:0, msg:"La voz más fuerte no necesariamente contiene toda la verdad."},
      {label:"Preguntar qué ocurrió", score:2, empathy:2, action:0, dialogue:2, msg:"Abres un espacio para que las dos versiones sean escuchadas."},
      {label:"Separar a las personas y buscar mediación", score:2, empathy:1, action:2, dialogue:1, msg:"Priorizas reducir el conflicto y buscar una salida imparcial."}
    ]
  },
  {
    title: "La decisión",
    text: "La situación puede terminar de varias maneras. Lo que hagas ahora determinará el carácter de la obra.",
    bubble: "A veces la justicia comienza con algo aparentemente pequeño: escuchar antes de decidir.",
    options: [
      {label:"Ignorar el conflicto", score:-2, empathy:-1, action:-1, dialogue:-1, msg:"La indiferencia también es una decisión."},
      {label:"Promover el diálogo", score:3, empathy:2, action:1, dialogue:3, msg:"El diálogo permite construir una respuesta colectiva."},
      {label:"Buscar una solución institucional", score:3, empathy:1, action:3, dialogue:1, msg:"Recurrir a mecanismos formales puede ayudar a garantizar un proceso justo."}
    ]
  },
  {
    title: "Lo que escuchaste afuera",
    text: "Después de la discusión, una de las personas te cuenta que antes ya había sido señalada injustamente. No sabes si su historia es cierta, pero notas que la situación tiene más antecedentes de los que imaginabas.",
    bubble: "“Siempre terminan pensando que fui yo”, dice mientras baja la mirada.",
    options: [
      {label:"Pensar que exagera", score:-1, empathy:-1, action:0, dialogue:0, msg:"Descartar una experiencia sin escucharla puede reforzar un prejuicio."},
      {label:"Preguntar qué ha ocurrido antes", score:2, empathy:2, action:0, dialogue:2, msg:"Preguntar permite conocer el contexto sin asumir que ya tienes toda la verdad."},
      {label:"Escuchar y ofrecer apoyo", score:2, empathy:3, action:1, dialogue:1, msg:"Reconoces que escuchar también puede ser una forma de acompañar."}
    ]
  },
  {
    title: "Cuando todos opinan",
    text: "Más personas comienzan a acercarse y cada una tiene una opinión distinta. Algunas repiten lo que escucharon sin haber presenciado el conflicto.",
    bubble: "“Yo ya sé quién tuvo la culpa”, comenta alguien que acaba de llegar.",
    options: [
      {label:"Seguir la opinión de la mayoría", score:-2, empathy:-1, action:0, dialogue:-1, msg:"La mayoría puede equivocarse cuando decide sin conocer los hechos."},
      {label:"Pedir que no se difundan rumores", score:2, empathy:1, action:2, dialogue:2, msg:"Evitas que una situación incierta se convierta en un juicio colectivo."},
      {label:"Invitar a escuchar a las personas involucradas", score:3, empathy:2, action:1, dialogue:3, msg:"Dar voz a quienes están directamente involucrados ayuda a construir una respuesta más justa."}
    ]
  },
  {
    title: "Una salida justa",
    text: "Ya conoces distintas versiones y el conflicto está bajando de intensidad. Ahora debes decidir qué hacer para que la solución no dependa solamente de quién habla más fuerte.",
    bubble: "“No quiero que esto termine en otra acusación”, dice una de las personas.",
    options: [
      {label:"Dejar que cada quien se vaya", score:0, empathy:0, action:0, dialogue:0, msg:"A veces alejarse evita el conflicto inmediato, pero no necesariamente resuelve el problema."},
      {label:"Proponer un acuerdo entre las personas", score:3, empathy:2, action:2, dialogue:3, msg:"Un acuerdo construido mediante el diálogo puede abrir una salida compartida."},
      {label:"Recurrir a una autoridad o mecanismo formal", score:3, empathy:1, action:4, dialogue:1, msg:"Cuando el conflicto lo requiere, recurrir a un mecanismo formal puede ayudar a garantizar un proceso imparcial."}
    ]
  }
];

function show(id){
  document.querySelectorAll('.screen').forEach(s=>s.classList.remove('active'));
  document.getElementById(id).classList.add('active');
  window.scrollTo({top:0,behavior:'smooth'});
}

const palettes = [
  {
    ink:'#171717', paper:'#f3eee4', red:'#a43b2f', gold:'#c89b4a',
    blue:'#324e68', muted:'#706b63', white:'#fffaf0', art:'#e7dfd0'
  },
  {
    ink:'#14213d', paper:'#edf2f4', red:'#c44536', gold:'#d9a441',
    blue:'#3f6c8f', muted:'#5d6770', white:'#f9fbfc', art:'#dce5ea'
  },
  {
    ink:'#202020', paper:'#f1eadf', red:'#8f3d4e', gold:'#b88a44',
    blue:'#385a64', muted:'#6f6861', white:'#fffaf2', art:'#e2d7ca'
  },
  {
    ink:'#1d2a24', paper:'#eef0e6', red:'#8c3f35', gold:'#c39a4b',
    blue:'#3f6260', muted:'#667067', white:'#fafbf4', art:'#dce2d7'
  }
];

function applyRandomPalette(){
  const palette=palettes[Math.floor(Math.random()*palettes.length)];
  const root=document.documentElement;
  Object.entries(palette).forEach(([name,value])=>{
    root.style.setProperty('--'+name,value);
  });
}

function shuffleOptions(options){
  const shuffled=[...options];
  for(let i=shuffled.length-1;i>0;i--){
    const j=Math.floor(Math.random()*(i+1));
    [shuffled[i],shuffled[j]]=[shuffled[j],shuffled[i]];
  }
  return shuffled;
}

function start(){
  state.step=0; state.score=0; state.choices=[]; state.empathy=0; state.action=0; state.dialogue=0;
  applyRandomPalette();
  show('story'); renderScene();
}

function renderScene(){
  const s=scenes[state.step];
  document.getElementById('storyTitle').textContent=s.title;
  document.getElementById('storyText').textContent=s.text;
  document.getElementById('bubble').textContent=s.bubble;
  document.getElementById('step').textContent=state.step+1;
  document.getElementById('bar').style.width=((state.step+1)/scenes.length*100)+'%';
  const box=document.getElementById('choices');
  box.innerHTML='';
  const shuffledOptions=shuffleOptions(s.options);
  shuffledOptions.forEach((opt,index)=>{
    const b=document.createElement('button');
    b.className='choice';
    b.textContent=(index+1)+'. '+opt.label;
    b.onclick=()=>choose(opt);
    box.appendChild(b);
  });
  document.getElementById('hint').textContent='Cada elección modifica el resultado visual de la obra.';
}

function choose(opt){
  state.score += opt.score;
  state.empathy += opt.empathy;
  state.action += opt.action;
  state.dialogue += opt.dialogue;
  state.choices.push(opt.label);

  const scene=document.getElementById('scene');
  scene.style.filter=`hue-rotate(${state.score*8}deg) saturate(${1+Math.max(0,state.empathy)*.08})`;
  document.getElementById('hint').textContent=opt.msg;

  if(state.step < scenes.length-1){
    state.step++;
    setTimeout(renderScene,650);
  }else{
    setTimeout(showResult,700);
  }
}

function showResult(){
  show('result');
  const total=state.score;
  let title, reflection;
  if(total >= 6){
    title="Construiste un espacio para escuchar.";
    reflection="Tu recorrido priorizó la empatía, el diálogo y la búsqueda de soluciones. La obra se vuelve más abierta y conectada: la justicia aparece como un proceso en el que escuchar y participar también importa.";
  }else if(total >= 2){
    title="Dejaste una puerta abierta.";
    reflection="Tus decisiones combinaron acciones individuales y búsqueda de diálogo. La obra muestra que una situación compleja rara vez tiene una sola lectura y que informarse antes de decidir puede cambiar el resultado.";
  }else{
    title="La indiferencia también deja una marca.";
    reflection="Tu recorrido muestra cómo juzgar sin información o ignorar un conflicto puede cerrar posibilidades de diálogo. La obra no busca señalarte: busca hacer visible que cada decisión modifica el espacio que compartimos.";
  }
  document.getElementById('resultTitle').textContent=title;
  document.getElementById('reflection').textContent=reflection;
  document.getElementById('tags').innerHTML=[
    `empatía: ${state.empathy}`,
    `acción: ${state.action}`,
    `diálogo: ${state.dialogue}`,
    `decisiones: ${state.choices.length}`
  ].map(t=>`<span class="tag">${t}</span>`).join('');
  drawArtwork();
}

function drawArtwork(){
  const canvas=document.getElementById('canvas');
  const ctx=canvas.getContext('2d');
  const w=canvas.width,h=canvas.height;
  ctx.clearRect(0,0,w,h);
  ctx.fillStyle='#111'; ctx.fillRect(0,0,w,h);

  // Parametrización: los datos del usuario controlan la composición.
  const count=18 + state.action*8 + state.dialogue*5;
  const spread=70 + Math.max(0,state.empathy)*25;
  const baseHue=(state.score*22+20)%360;

  // Ciclo + aleatoriedad + generación procedural.
  for(let i=0;i<count;i++){
    const x=(i*67 + Math.random()*spread*4)%w;
    const y=(i*113 + Math.random()*h)%h;
    const size=8 + Math.random()*(15+Math.abs(state.score)*2);
    const hue=(baseHue+i*13)%360;
    ctx.fillStyle=`hsl(${hue}, ${35+state.dialogue*8}%, ${45+Math.random()*25}%)`;
    ctx.beginPath();

    // Forma geométrica elegida mediante selección.
    if(i%3===0){
      ctx.arc(x,y,size,0,Math.PI*2);
    }else if(i%3===1){
      ctx.rect(x-size,y-size,size*2,size*2);
    }else{
      ctx.moveTo(x,y-size); ctx.lineTo(x+size,y+size); ctx.lineTo(x-size,y+size); ctx.closePath();
    }
    ctx.fill();
  }

  // Líneas: representación de conexiones entre decisiones.
  ctx.strokeStyle='rgba(255,250,240,.45)';
  ctx.lineWidth=2;
  for(let i=0;i<8;i++){
    ctx.beginPath();
    ctx.moveTo(0,(i+1)*h/9);
    ctx.bezierCurveTo(w*.3,Math.sin(i)*80+h/2,w*.7,Math.cos(i)*90+h/2,w,(i+1)*h/9);
    ctx.stroke();
  }

  // Título como elemento de composición.
  ctx.fillStyle='#fffaf0';
  ctx.font='bold 42px Arial';
  ctx.fillText('ANTES DE JUZGAR',42,70);
  ctx.font='16px Arial';
  ctx.fillText('una composición generada por tus decisiones',44,98);
}

function restart(){ start(); }
