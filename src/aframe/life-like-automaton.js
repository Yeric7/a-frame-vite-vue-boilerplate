AFRAME.registerComponent('life-like-automaton', {
  schema: {
    resolution: {type: 'int', default: 128},

    // Change rules to explore different Automaton, the default rules ( B 3,S 23 ) are the one of the classic Game Of Life
    birthRule: {type: 'array', default: [3]},
    survivalRule: {type: 'array', default: [2, 3]},
    // for exemple try this one: B 678 S 45678

    maxGen: {type: 'int', default: Infinity},
    probAlive: {type: 'number', default: 0.5},
    genPerSec: {type: 'int', default: 60},

    backSide: {type: 'boolean', default: false},
  },

  init: function () {
    this.generation = 0;
    this.birthRule = new Set(this.data.birthRule.map(n => +n));
    this.survivalRule = new Set(this.data.survivalRule.map(n => +n));

    // Build of the initial grid of the Game of Life like automaton (data saved on the red channel)
    this.grid = new Uint8Array(this.data.resolution * this.data.resolution);
    for (let i = 0; i < this.grid.length; i++) {
      this.grid[i] = Math.random() < this.data.probAlive ? 1 : 0;
    }

    this.texture = new THREE.DataTexture(this.grid, this.data.resolution, this.data.resolution);
    this.texture.format = THREE.RedFormat;
    this.texture.needsUpdate = true;

    this.material = this.el.getObject3D('mesh').material = new THREE.ShaderMaterial({

      uniforms: {
        tex: {value: this.texture},
        time: {value: 0},
        resolution: {value: this.resolution}
      },

      vertexShader: /*glsl*/ `
        varying vec2 vUv;

        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,

      fragmentShader: /*glsl*/ `precision highp float; // mediump or highp

      #define PI 3.14159265359
      #define TWO_PI 6.28318530718
    
      uniform float time;
      uniform vec2 resolution;
    
      varying vec2 vUv;
    
      vec2 rotate2D(vec2 _st, float _angle){
        _st -= 0.5;
        _st =  mat2(cos(_angle),-sin(_angle),
                    sin(_angle),cos(_angle)) * _st;
        _st += 0.5;
        return _st;
      }
    
      vec2 random2(vec2 st){
        st = vec2( dot(st,vec2(127.1,311.7)),
                  dot(st,vec2(269.5,183.3)) );
        return -1.0 + 2.0*fract(sin(st)*43758.5453123);
      }
    
    
      void main() {
        vec2 st = vUv;
    
        // scale the space
        vec2 stTemp = fract(st * 20.);
        float y1 = step(.5,mod(stTemp.x,2.0));
        float y2 = -1.*step(0.5,1.-mod(stTemp.x,2.0));
    
        // scale the space
        st *= 20.;
    
        st = rotate2D(st,PI*0.25 + (y1 + y2)*time/25000.0);
    
    
        vec2 i_st = floor(st);
        vec2 f_st = fract(st);
    
        float m_dist = 1.;  // minimum distance
        for (int y= -1; y <= 1; y++) {
          for (int x= -1; x <= 1; x++) {
            // cellules voisines
            vec2 neighbor = vec2(float(x),float(y));
            vec2 point = random2(i_st + neighbor);
            point = .5 + .5*sin(time/2000. + TWO_PI*point);
            // Vector between the pixel and the point
            vec2 diff = neighbor + point - f_st;
            float dist = length(diff);
            m_dist = min(m_dist, dist);
          }
        }
    
        vec3 color = vec3(.0);
        color += m_dist;
        color += 1.-step(.02, m_dist);
    
        color -= step(.1,abs(sin(12.0*m_dist)))*.5;
    
        color += vec3(y1/2., 0, abs(cos(time/8000.)));
    
        gl_FragColor = vec4(color,1.0);
      }
    
    `,

    });

    this.material.side = THREE.DoubleSide;

    this.tick = AFRAME.utils.throttleTick(this.nextGen, 1000/this.data.genPerSec, this);
  },

  nextGen: function (elapsedT) {
    this.generation++;
    if (this.generation > this.data.maxGen) return;

    const toSwitch = [];
    for (let i = 0; i < this.grid.length; i++) {
      let n = 0;
      n += this.grid[i + 1] ?? 0;
      n += this.grid[i - 1] ?? 0;
      n += this.grid[i + this.data.resolution] ?? 0;
      n += this.grid[i + this.data.resolution + 1] ?? 0;
      n += this.grid[i + this.data.resolution - 1] ?? 0;
      n += this.grid[i - this.data.resolution] ?? 0;
      n += this.grid[i - this.data.resolution + 1] ?? 0;
      n += this.grid[i - this.data.resolution - 1] ?? 0;
      if ((!this.grid[i] && this.birthRule.has(n)) || (this.grid[i] && !this.survivalRule.has(n))) {
        toSwitch.push(i);
      }
    }
    for (const i of toSwitch) {
      this.grid[i] = this.grid[i] ? 0 : 1;
    }
    this.material.uniforms.time.value = elapsedT;
    this.texture.needsUpdate = true;
  },

  remove: function () {
    this.material.dispose();
  },

});