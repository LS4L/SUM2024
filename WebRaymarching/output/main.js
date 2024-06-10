var XXX = (function (exports) {
  'use strict';

  class S {
      _s;
      _name = 'S';
      constructor(v = '0.') {
          if (typeof v == 'string')
              this._s = v;
          else
              this._s = v.toString();
      }
      get s() {
          if (isNaN(+this._s))
              return this._s;
          else
              return (+this._s).toFixed(3);
      }
      set s(newS) {
          this._s = newS;
      }
      toString() {
          return this.s;
      }
  }
  function isS(value) {
      return value && value._name == 'S';
  }
  function isSVec(value) {
      return value && value._name == 'svec3'; // I have no idea why and how this should work
  }
  function isVec(value) {
      return value && value._name == 'vec3'; // I have no idea why and how this should work
  }
  class svec3 {
      _x;
      _y;
      _z;
      _name = 'svec3';
      constructor(x = '0', y = '0', z = '0') {
          if (typeof x == 'number')
              this._x = x.toString();
          else
              this._x = x;
          if (typeof y == 'number')
              this._y = y.toString();
          else
              this._y = y;
          if (typeof z == 'number')
              this._z = z.toString();
          else
              this._z = z;
      }
      get x() {
          if (isNaN(+this._x))
              return this._x;
          else
              return (+this._x).toFixed(1);
      }
      get z() {
          if (isNaN(+this._z))
              return this._z;
          else
              return (+this._z).toFixed(1);
      }
      get y() {
          if (isNaN(+this._y))
              return this._y;
          else
              return (+this._y).toFixed(1);
      }
      set x(newVal) {
          this._x = newVal;
      }
      set y(newVal) {
          this._y = newVal;
      }
      set z(newVal) {
          this._z = newVal;
      }
      str = () => `vec3(${this.x},${this.y},${this.z})`;
      toVec3 = () => new vec3(+this.x, +this.y, +this.z);
  }
  class vec3 {
      x;
      y;
      z;
      _name = 'vec3';
      constructor(x = 0, y = 0, z = 0) {
          this.x = x;
          this.y = y;
          this.z = z;
      }
      arr = () => [this.x, this.y, this.z];
      arr4 = (w = 0) => [this.x, this.y, this.z, w];
      str = () => `vec3(${this.x},${this.y},${this.z})`;
      copy = () => new vec3(this.x, this.y, this.z);
      eq = (vec) => this.x == vec.x && this.y == vec.y && this.z == vec.z;
      add = (vec) => new vec3(this.x + vec.x, this.y + vec.y, this.z + vec.z);
      sub = (vec) => new vec3(this.x - vec.x, this.y - vec.y, this.z - vec.z);
      mul = (n) => new vec3(this.x * n, this.y * n, this.z * n);
      div = (n) => (n != 0 ? new vec3(this.x / n, this.y / n, this.z / n) : new vec3());
      neg = () => new vec3(-this.x, -this.y, -this.z);
      dot = (vec) => this.x * vec.x + this.y * vec.y + this.z * vec.z;
      cross = (vec) => new vec3(this.y * vec.z - this.z * vec.y, this.z * vec.x - this.x * vec.z, this.x * vec.y - this.y * vec.x);
      len2 = () => this.x * this.x + this.y * this.y + this.z * this.z;
      len = () => Math.sqrt(this.len2());
      normalize = () => this.div(this.len());
      lerp = (vec, c = 0.5) => new vec3(this.x + (vec.x - this.x) * c, this.y + (vec.y - this.y) * c, this.z + (vec.z - this.z) * c);
      mulMatr(m) {
          const w = this.x * m.m[0][3] + this.y * m.m[1][3] + this.z * m.m[2][3] + m.m[3][3];
          return new vec3((this.x * m.m[0][0] + this.y * m.m[1][0] + this.z * m.m[2][0] + m.m[3][0]) / w, (this.x * m.m[0][1] + this.y * m.m[1][1] + this.z * m.m[2][1] + m.m[3][1]) / w, (this.x * m.m[0][2] + this.y * m.m[1][2] + this.z * m.m[2][2] + m.m[3][2]) / w);
      }
      angle(vec, up = new vec3(0, 1, 0)) {
          if (vec.len2() == 0 || this.len2() == 0)
              return 0;
          let angle = Math.acos(this.dot(vec) / (this.len() * vec.len()));
          if (this.cross(vec).dot(up) < 0)
              angle = -angle;
          return angle;
      }
      get xxx() {
          return new vec3(this.x, this.x, this.x);
      }
      get yyy() {
          return new vec3(this.y, this.y, this.y);
      }
      get zzz() {
          return new vec3(this.z, this.z, this.z);
      }
  }
  class matr4 {
      /*
    '0': number[]
    '1': number[]
    '2': number[]
    '3': number[]
  */
      m = [
          [1, 0, 0, 0],
          [0, 1, 0, 0],
          [0, 0, 1, 0],
          [0, 0, 0, 1]
      ];
      constructor(m) {
          if (m)
              this.m = m;
      }
      str3x4 = () => 'mat4x3(' +
          this.m
              .map((old) => old.slice(0, -1))
              .flat()
              .join(',') +
          ')';
      static translate(vec) {
          return new matr4([
              [1, 0, 0, 0],
              [0, 1, 0, 0],
              [0, 0, 1, 0],
              [vec.x, vec.y, vec.z, 1]
          ]);
      }
      static scale(vec) {
          return new matr4([
              [vec.x, 0, 0, 0],
              [0, vec.y, 0, 0],
              [0, 0, vec.z, 0],
              [0, 0, 0, 1]
          ]);
      }
      static rotateX(angleInDegree) {
          const m = new matr4();
          const a = (angleInDegree / 180) * Math.PI;
          const sine = Math.sin(a);
          const cosine = Math.cos(a);
          m.m[1][1] = cosine;
          m.m[2][2] = cosine;
          m.m[1][2] = sine;
          m.m[2][1] = -sine;
          return m;
      }
      static rotateY(angleInDegree) {
          const m = new matr4();
          const a = (angleInDegree / 180) * Math.PI;
          const sine = Math.sin(a);
          const cosine = Math.cos(a);
          m.m[0][0] = cosine;
          m.m[2][2] = cosine;
          m.m[0][2] = -sine;
          m.m[2][0] = sine;
          return m;
      }
      static rotateZ(angleInDegree) {
          const m = new matr4();
          const a = (angleInDegree / 180) * Math.PI;
          const sine = Math.sin(a);
          const cosine = Math.cos(a);
          m.m[0][0] = cosine;
          m.m[1][1] = cosine;
          m.m[0][1] = sine;
          m.m[1][0] = -sine;
          return m;
      }
      static rotate(angleInDegree, v) {
          const a = (angleInDegree / 180) * Math.PI;
          const si = Math.sin(a);
          const co = Math.cos(a);
          return new matr4([
              [co + v.x * v.x * (1 - co), v.x * v.y * (1 - co) + v.z * si, v.x * v.z * (1 - co) - v.y * si, 0],
              [v.y * v.x * (1 - co) - v.z * si, co + v.y * v.y * (1 - co), v.y * v.z * (1 - co) + v.x * si, 0],
              [v.z * v.x * (1 - co) + v.y * si, v.z * v.y * (1 - co) - v.x * si, co + v.z * v.z * (1 - co), 0],
              [0, 0, 0, 1]
          ]);
      }
      /*
    transpose() {
      let res = new matr4()

      (res.m[0][0] = this.m[0][0]), (res.m[0][1] = this.m[1][0]), (res.m[0][2] = this.m[2][0]), (res.m[0][3] = this.m[3][0])
      (res.m[1][0] = this.m[0][1]), (res.m[1][1] = this.m[1][1]), (res.m[1][2] = this.m[2][1]), (res.m[1][3] = this.m[3][1])
      (res.m[2][0] = this.m[0][2]), (res.m[2][1] = this.m[1][2]), (res.m[2][2] = this.m[2][2]), (res.m[2][3] = this.m[3][2])
      (res.m[3][0] = this.m[0][3]), (res.m[3][1] = this.m[1][3]), (res.m[3][2] = this.m[2][3]), (res.m[3][3] = this.m[3][3])

      return res
    }
  */
      determ3x3(A11, A12, A13, A21, A22, A23, A31, A32, A33) {
          return A11 * A22 * A33 + A12 * A23 * A31 + A13 * A21 * A32 - A11 * A23 * A32 - A12 * A21 * A33 - A13 * A22 * A31;
      }
      determ() {
          return (+this.m[0][0] *
              this.determ3x3(this.m[1][1], this.m[1][2], this.m[1][3], this.m[2][1], this.m[2][2], this.m[2][3], this.m[3][1], this.m[3][2], this.m[3][3]) +
              -this.m[0][1] *
                  this.determ3x3(this.m[1][0], this.m[1][2], this.m[1][3], this.m[2][0], this.m[2][2], this.m[2][3], this.m[3][0], this.m[3][2], this.m[3][3]) +
              +this.m[0][2] *
                  this.determ3x3(this.m[1][0], this.m[1][1], this.m[1][3], this.m[2][0], this.m[2][1], this.m[2][3], this.m[3][0], this.m[3][1], this.m[3][3]) +
              -this.m[0][3] *
                  this.determ3x3(this.m[1][0], this.m[1][1], this.m[1][2], this.m[2][0], this.m[2][1], this.m[2][2], this.m[3][0], this.m[3][1], this.m[3][2]));
      }
      inverse() {
          const det = this.determ();
          const r = new matr4();
          if (det == 0)
              return new matr4();
          r.m[0][0] =
              +this.determ3x3(this.m[1][1], this.m[1][2], this.m[1][3], this.m[2][1], this.m[2][2], this.m[2][3], this.m[3][1], this.m[3][2], this.m[3][3]) / det;
          r.m[1][0] =
              -this.determ3x3(this.m[1][0], this.m[1][2], this.m[1][3], this.m[2][0], this.m[2][2], this.m[2][3], this.m[3][0], this.m[3][2], this.m[3][3]) / det;
          r.m[2][0] =
              +this.determ3x3(this.m[1][0], this.m[1][1], this.m[1][3], this.m[2][0], this.m[2][1], this.m[2][3], this.m[3][0], this.m[3][1], this.m[3][3]) / det;
          r.m[3][0] =
              -this.determ3x3(this.m[1][0], this.m[1][1], this.m[1][2], this.m[2][0], this.m[2][1], this.m[2][2], this.m[3][0], this.m[3][1], this.m[3][2]) / det;
          r.m[0][1] =
              -this.determ3x3(this.m[0][1], this.m[0][2], this.m[0][3], this.m[2][1], this.m[2][2], this.m[2][3], this.m[3][1], this.m[3][2], this.m[3][3]) / det;
          r.m[1][1] =
              +this.determ3x3(this.m[0][0], this.m[0][2], this.m[0][3], this.m[2][0], this.m[2][2], this.m[2][3], this.m[3][0], this.m[3][2], this.m[3][3]) / det;
          r.m[2][1] =
              -this.determ3x3(this.m[0][0], this.m[0][1], this.m[0][3], this.m[2][0], this.m[2][1], this.m[2][3], this.m[3][0], this.m[3][1], this.m[3][3]) / det;
          r.m[3][1] =
              +this.determ3x3(this.m[0][0], this.m[0][1], this.m[0][2], this.m[2][0], this.m[2][1], this.m[2][2], this.m[3][0], this.m[3][1], this.m[3][2]) / det;
          r.m[0][2] =
              +this.determ3x3(this.m[0][1], this.m[0][2], this.m[0][3], this.m[1][1], this.m[1][2], this.m[1][3], this.m[3][1], this.m[3][2], this.m[3][3]) / det;
          r.m[1][2] =
              -this.determ3x3(this.m[0][0], this.m[0][2], this.m[0][3], this.m[1][0], this.m[1][2], this.m[1][3], this.m[3][0], this.m[3][2], this.m[3][3]) / det;
          r.m[2][2] =
              +this.determ3x3(this.m[0][0], this.m[0][1], this.m[0][3], this.m[1][0], this.m[1][1], this.m[1][3], this.m[3][0], this.m[3][1], this.m[3][3]) / det;
          r.m[3][2] =
              -this.determ3x3(this.m[0][0], this.m[0][1], this.m[0][2], this.m[1][0], this.m[1][1], this.m[1][2], this.m[3][0], this.m[3][1], this.m[3][2]) / det;
          r.m[0][3] =
              -this.determ3x3(this.m[0][1], this.m[0][2], this.m[0][3], this.m[1][1], this.m[1][2], this.m[1][3], this.m[2][1], this.m[2][2], this.m[2][3]) / det;
          r.m[1][3] =
              +this.determ3x3(this.m[0][0], this.m[0][2], this.m[0][3], this.m[1][0], this.m[1][2], this.m[1][3], this.m[2][0], this.m[2][2], this.m[2][3]) / det;
          r.m[2][3] =
              -this.determ3x3(this.m[0][0], this.m[0][1], this.m[0][3], this.m[1][0], this.m[1][1], this.m[1][3], this.m[2][0], this.m[2][1], this.m[2][3]) / det;
          r.m[3][3] =
              +this.determ3x3(this.m[0][0], this.m[0][1], this.m[0][2], this.m[1][0], this.m[1][1], this.m[1][2], this.m[2][0], this.m[2][1], this.m[2][2]) / det;
          return r;
      }
      mul(m) {
          const r = new matr4();
          r.m[0][0] = this.m[0][0] * m.m[0][0] + this.m[0][1] * m.m[1][0] + this.m[0][2] * m.m[2][0] + this.m[0][3] * m.m[3][0];
          r.m[0][1] = this.m[0][0] * m.m[0][1] + this.m[0][1] * m.m[1][1] + this.m[0][2] * m.m[2][1] + this.m[0][3] * m.m[3][1];
          r.m[0][2] = this.m[0][0] * m.m[0][2] + this.m[0][1] * m.m[1][2] + this.m[0][2] * m.m[2][2] + this.m[0][3] * m.m[3][2];
          r.m[0][3] = this.m[0][0] * m.m[0][3] + this.m[0][1] * m.m[1][3] + this.m[0][2] * m.m[2][3] + this.m[0][3] * m.m[3][3];
          r.m[1][0] = this.m[1][0] * m.m[0][0] + this.m[1][1] * m.m[1][0] + this.m[1][2] * m.m[2][0] + this.m[1][3] * m.m[3][0];
          r.m[1][1] = this.m[1][0] * m.m[0][1] + this.m[1][1] * m.m[1][1] + this.m[1][2] * m.m[2][1] + this.m[1][3] * m.m[3][1];
          r.m[1][2] = this.m[1][0] * m.m[0][2] + this.m[1][1] * m.m[1][2] + this.m[1][2] * m.m[2][2] + this.m[1][3] * m.m[3][2];
          r.m[1][3] = this.m[1][0] * m.m[0][3] + this.m[1][1] * m.m[1][3] + this.m[1][2] * m.m[2][3] + this.m[1][3] * m.m[3][3];
          r.m[2][0] = this.m[2][0] * m.m[0][0] + this.m[2][1] * m.m[1][0] + this.m[2][2] * m.m[2][0] + this.m[2][3] * m.m[3][0];
          r.m[2][1] = this.m[2][0] * m.m[0][1] + this.m[2][1] * m.m[1][1] + this.m[2][2] * m.m[2][1] + this.m[2][3] * m.m[3][1];
          r.m[2][2] = this.m[2][0] * m.m[0][2] + this.m[2][1] * m.m[1][2] + this.m[2][2] * m.m[2][2] + this.m[2][3] * m.m[3][2];
          r.m[2][3] = this.m[2][0] * m.m[0][3] + this.m[2][1] * m.m[1][3] + this.m[2][2] * m.m[2][3] + this.m[2][3] * m.m[3][3];
          r.m[3][0] = this.m[3][0] * m.m[0][0] + this.m[3][1] * m.m[1][0] + this.m[3][2] * m.m[2][0] + this.m[3][3] * m.m[3][0];
          r.m[3][1] = this.m[3][0] * m.m[0][1] + this.m[3][1] * m.m[1][1] + this.m[3][2] * m.m[2][1] + this.m[3][3] * m.m[3][1];
          r.m[3][2] = this.m[3][0] * m.m[0][2] + this.m[3][1] * m.m[1][2] + this.m[3][2] * m.m[2][2] + this.m[3][3] * m.m[3][2];
          r.m[3][3] = this.m[3][0] * m.m[0][3] + this.m[3][1] * m.m[1][3] + this.m[3][2] * m.m[2][3] + this.m[3][3] * m.m[3][3];
          return r;
      }
      view(loc, at, up1) {
          const dir = at.sub(loc).normalize(), right = dir.cross(up1).normalize(), up = right.cross(dir);
          return new matr4([
              [right.x, up.x, -dir.x, 0],
              [right.y, up.y, -dir.y, 0],
              [right.z, up.z, -dir.z, 0],
              [-loc.dot(right), -loc.dot(up), loc.dot(dir), 1]
          ]);
      }
  }

  class Camera {
      projSize = 0.1;
      projDist = 0.1;
      projFarClip = 18000;
      frameW = 30;
      frameH = 30;
      matrView = new matr4();
      matrProj = new matr4();
      matrVP = new matr4();
      id = Math.random().toString();
      mode = 'floating';
      userDir = new vec3();
      loc = new vec3();
      at = new vec3();
      speed = 0;
      dir = new vec3(-this.matrView.m[0][2], -this.matrView.m[1][2], -this.matrView.m[2][2]);
      up = new vec3(this.matrView.m[0][1], this.matrView.m[1][1], this.matrView.m[2][1]);
      right = new vec3(this.matrView.m[0][0], this.matrView.m[1][0], this.matrView.m[2][0]);
      pos = new vec3();
      userLoc = new vec3();
      camSet(loc, at, up, pos, userLoc) {
          const myMatr4 = new matr4();
          this.matrView = myMatr4.view(loc, at, up);
          this.loc = loc;
          this.at = at;
          this.dir = new vec3(-this.matrView.m[0][2], -this.matrView.m[1][2], -this.matrView.m[2][2]);
          this.up = new vec3(this.matrView.m[0][1], this.matrView.m[1][1], this.matrView.m[2][1]);
          this.right = new vec3(this.matrView.m[0][0], this.matrView.m[1][0], this.matrView.m[2][0]);
          this.pos = pos;
          this.userLoc = userLoc;
          this.matrVP = this.matrView.mul(this.matrProj);
          return this;
      }
      setProj(projSize, projDist, projFarClip) {
          let rx, ry;
          rx = ry = projSize;
          this.projDist = projDist;
          this.projSize = projSize;
          this.projFarClip = projFarClip;
          /* Correct aspect ratio */
          if (this.frameW > this.frameH)
              rx *= this.frameW / this.frameH;
          else
              ry *= this.frameH / this.frameW;
          //not sure
          //this.matrProj = myMatr4.frustum(-rx / 2, rx / 2, -ry / 2, ry / 2, projDist, projFarClip)
          this.matrVP = this.matrView.mul(this.matrProj);
          return this;
      }
      /*rotate(v, a) {
      let newLoc, newUp, newAt;
      let rot = new matr4();
      rot = rot.rotate(a, v);
      newLoc = this.loc.mulMatr(rot);
      newUp = this.up.mulMatr(rot);
      newAt = this.at.mulMatr(rot);
      this.camSet(newLoc, newAt, newUp);
      return this;
    }*/
      setSize(frameW, frameH) {
          this.frameW = frameW;
          this.frameH = frameH;
          this.setProj(this.projSize, this.projDist, this.projFarClip);
          return this;
      }
      setDef() {
          this.loc = new vec3(-5, 0, -5);
          this.at = new vec3(0, 0, 0);
          this.up = new vec3(0, 1, 0);
          this.projDist = 0.1;
          this.projSize = 0.1;
          this.projFarClip = 10000;
          this.frameW = 30;
          this.frameH = 30;
          this.camSet(this.loc, this.at, this.up, this.pos, this.userLoc);
          this.setProj(this.projSize, this.projDist, this.projFarClip);
          this.setSize(this.frameW, this.frameH);
          return this;
      }
  }

  const keys = new Map();
  const mouse = {
      x: 0,
      y: 0,
      savedX: 0,
      savedY: 0,
      zoom: 1,
      dx: 0,
      dy: 0,
      dz: 0,
      isDown: false,
      isRDown: false
  };
  const cam = new Camera();
  cam.camSet(new vec3(0, 0, -5), new vec3(0, 0, 0), new vec3(0, 1, 0), new vec3(1, 1, 1), new vec3(0, 0.8, 0));
  function handleMouseMove(event) {
      mouse.dx = event.pageX - mouse.x;
      mouse.dy = event.pageY - mouse.y;
      mouse.x = event.pageX;
      mouse.y = event.pageY;
  }
  function handleMouseDown(event) {
      if (event.button == 0)
          mouse.isDown = true;
      else if (event.button == 2)
          mouse.isRDown = true;
  }
  function handleMouseUp(event) {
      // mouse.savedX = event.pageX;
      //mouse.savedY = event.pageY;
      if (event.button == 0)
          mouse.isDown = false;
      else if (event.button == 2)
          mouse.isRDown = false;
  }
  function handleMouseZoom(event) {
      //mouse.dz = event.deltaY - mouse.zoom;
      mouse.dz = event.deltaY;
  }
  function handleKeyUp(event) {
      keys.set(event.code, false);
  }
  function handleKeyDown(event) {
      keys.set(event.code, true);
  }
  const angleSpeed = 0.05;
  let speed = 1;
  const speedUp = 10;
  function floatingCamera() {
      /*let th =
          mouse.isDown *
          angleSpeed *
          Math.sqrt(mouse.dy * mouse.dy + mouse.dx * mouse.dx);
      */ /*
      let dist = cam.at.sub(cam.loc).len(),
          cosT = cam.loc.y - cam.at.y / dist,
          sinT = Math.sqrt(1 - cosT * cosT),
          plen = dist * sinT,
          cosP = (cam.loc.z - cam.at.z) / plen,
          sinP = (cam.loc.x - cam.at.x) / plen,
          azimuth = (Math.atan2(sinP, cosP) / Math.PI) * 180,
          elevator = (Math.atan2(sinT, cosT) / Math.PI) * 180;
  */
      cam.loc = cam.loc.add(cam.dir.mul(-mouse.dz * 0.01));
      mouse.dz = 0;
      /* Mouse x */
      cam.loc = cam.loc.mulMatr(matr4.rotate(+mouse.isDown * angleSpeed * mouse.dx, cam.up.neg())); /* !!Ani->DeltaTime *  */
      /* Mouse y */
      cam.loc = cam.loc.mulMatr(matr4.rotate(+mouse.isDown * angleSpeed * mouse.dy, cam.right.neg())); /* !!Ani->DeltaTime *  */
      /*** Moving free cam ***/
      /* Mouse x */
      cam.at = cam.at.sub(cam.loc);
      cam.at = cam.at.mulMatr(matr4.rotateY(+mouse.isRDown * angleSpeed * mouse.dx));
      cam.at = cam.at.add(cam.loc);
      cam.right = cam.right.mulMatr(matr4.rotateY(+mouse.isRDown * angleSpeed * mouse.dx));
      /* Mouse y */
      /*cam.at =
      PointTransform(cam.at,
        myMatr4.rotateX(!!mouse.isRDown *
                     angleSpeed * mouse.dy));
    */
      cam.at = cam.at.sub(cam.loc);
      cam.at = cam.at.mulMatr(matr4.rotate(+mouse.isRDown * angleSpeed * mouse.dy, cam.right));
      cam.at = cam.at.add(cam.loc);
      speed += keys.get('Shift') ? speedUp : 0;
      /* Arrows */
      cam.loc = cam.loc
          .add(cam.dir.mul(+!!keys.get('KeyW') * +!keys.get('ControlLeft') * speed))
          .sub(cam.dir.mul(+!!keys.get('KeyS') * +!keys.get('ControlLeft') * speed))
          .sub(cam.right.mul(+!!keys.get('KeyA') * +!keys.get('ControlLeft') * speed))
          .add(cam.right.mul(+!!keys.get('KeyD') * +!keys.get('ControlLeft') * speed));
      /* CamAt via arrows */
      cam.at = cam.at
          .add(cam.dir.mul(+!!keys.get('KeyW') * +!keys.get('ControlLeft') * speed))
          .sub(cam.dir.mul(+!!keys.get('KeyS') * +!keys.get('ControlLeft') * speed))
          .sub(cam.right.mul(+!!keys.get('KeyA') * +!keys.get('ControlLeft') * speed))
          .add(cam.right.mul(+!!keys.get('KeyD') * +!keys.get('ControlLeft') * speed));
      speed -= keys.get('Shift') ? speedUp : 0;
      cam.camSet(cam.loc, cam.at, cam.up, cam.pos, cam.userLoc);
  }
  function walking() {
      /* Upscaling */
      cam.pos = cam.pos.add(cam.pos.mul(mouse.dz * 0.001));
      /* Rotating */
      /* Mouse x */
      cam.pos = cam.pos.mulMatr(matr4.rotateY(-mouse.isDown * angleSpeed * mouse.dx)); /* !!Ani->DeltaTime *  */
      /* Mouse y */
      cam.pos = cam.pos.mulMatr(matr4.rotateX(-mouse.isDown * angleSpeed * mouse.dy));
      cam.userDir = cam.pos.neg().normalize();
      cam.userDir.y = 0;
      /* Walking */
      cam.userLoc = cam.userLoc
          .add(cam.userDir.mul(+!!keys.get('KeyW') * +!keys.get('ControlLeft') * speed))
          .add(cam.userDir.mul(-!!keys.get('KeyS') * speed))
          .add(cam.userDir.mulMatr(matr4.rotateY(90)).mul(+!!keys.get('KeyA') * speed))
          .add(cam.userDir.mulMatr(matr4.rotateY(90)).mul(-!!keys.get('KeyD') * speed));
      cam.at = cam.userLoc;
      cam.dir = cam.pos.neg().normalize();
      cam.loc = cam.userLoc.add(cam.pos);
      cam.right = cam.userDir.cross(new vec3(0, 1, 0));
      cam.up = cam.right.cross(cam.dir);
  }
  cam.speed = 0;
  cam.userDir = new vec3(1, 0, 0);
  cam.pos = new vec3(-1, 1, 0);
  const acceleration = 0.01;
  const deceleration = 1.01;
  let rotAngle = 0;
  const maxRotAngle = 45;
  const angleAcceleration = 0.2;
  const angleDeceleration = 1.1;
  function bike() {
      cam.speed += (+!!keys.get('KeyW') - +!!keys.get('KeyS')) * acceleration;
      cam.speed /= deceleration;
      /* Upscaling */
      cam.pos = cam.pos.add(cam.pos.mul(mouse.dz * 0.001));
      rotAngle += (-!!keys.get('KeyD') + +!!keys.get('KeyA')) * angleAcceleration;
      if (rotAngle > maxRotAngle)
          rotAngle = maxRotAngle;
      if (rotAngle < -maxRotAngle)
          rotAngle = -maxRotAngle;
      rotAngle /= angleDeceleration;
      cam.userDir = cam.userDir.mulMatr(matr4.rotateY(rotAngle * Math.sqrt(Math.abs(cam.speed))));
      /* Walking */
      cam.pos = cam.pos.mulMatr(matr4.rotateY(rotAngle * Math.sqrt(Math.abs(cam.speed))));
      cam.userLoc = cam.userLoc.add(cam.userDir.mul(cam.speed));
      /* Rotate around bike: this do not changes driving direction */
      /* Mouse x */
      cam.pos = cam.pos.mulMatr(matr4.rotateY(-mouse.isDown * angleSpeed * mouse.dx)); /* !!Ani->DeltaTime */
      /* Mouse y */
      cam.pos = cam.pos.mulMatr(matr4.rotate(-mouse.isDown * angleSpeed * mouse.dy, cam.right));
      cam.at = cam.userLoc;
      cam.dir = cam.pos.neg().normalize();
      cam.loc = cam.userLoc.add(cam.pos);
      const correctDir = new vec3(cam.dir.x, 0, cam.dir.z);
      cam.right = correctDir.cross(new vec3(0, 1, 0));
      cam.up = cam.right.cross(cam.dir);
  }
  function ControlCamera() {
      if (exports.isMouseOverCanvas) {
          if (cam.mode == 'floating')
              floatingCamera();
          else if (cam.mode == 'walking')
              walking();
          else
              bike();
      }
  }

  class Id {
      static currentId = 0;
      static get new() {
          this.currentId++;
          return (this.currentId - 1).toString();
      }
      static setMax(newId) {
          if (typeof newId == 'number' && !isNaN(newId) && newId >= this.currentId)
              this.currentId = newId + 1;
      }
  }
  function appendTextEditor(name, initial, parent, onchange) {
      const input1 = document.createElement('input');
      input1.type = 'text';
      input1.value = initial.toString();
      input1.placeholder = name;
      input1.id = Id.new;
      input1.onchange = () => {
          onchange(input1.value);
      };
      const label = document.createElement('label');
      label.textContent = name;
      label.htmlFor = input1.id;
      parent.append(label);
      parent.append(input1);
  }
  function appendSVec(name, vector, parent) {
      const inputDiv = document.createElement('div');
      const label = document.createElement('span');
      label.textContent = name;
      inputDiv.append(label);
      appendTextEditor('X', vector.x, inputDiv, (newVal) => {
          vector.x = newVal;
          compileShader();
      });
      appendTextEditor('Y', vector.y, inputDiv, (newVal) => {
          vector.y = newVal;
          compileShader();
      });
      appendTextEditor('Z', vector.z, inputDiv, (newVal) => {
          vector.z = newVal;
          compileShader();
      });
      parent.append(inputDiv);
  }
  function appendShapes(name, shape, parent) {
      const inputDiv = document.createElement('div');
      const shapeAddButton = document.createElement('button');
      shapeAddButton.innerText = 'Add';
      shapeAddButton.className = 'button-add';
      shapeAddButton.onclick = () => {
          addShape(shapeTypes[shapeTypeSelect.selectedIndex], shape);
          compileShader();
      };
      inputDiv.append(shapeAddButton);
      const shapeTypeSelect = document.createElement('select');
      shapeTypes.forEach((shapeType) => {
          const shapeSelectOption = document.createElement('option');
          shapeSelectOption.value = shapeType;
          shapeSelectOption.innerHTML = shapeType;
          shapeTypeSelect.append(shapeSelectOption);
      });
      inputDiv.append(shapeTypeSelect);
      parent.append(inputDiv);
  }
  function appendShapeDiv(shape, parent, onDelete) {
      const shapeDiv = document.createElement('div');
      shapeDiv.className = 'shape';
      shapeDiv.innerText = 'ID: ' + shape.id;
      parent.append(shapeDiv);
      const shapeType = document.createElement('select');
      shapeType.style.margin = '5px';
      isTwo(shape);
      shapeTypes.forEach((type) => {
          const shapeSelectOption = document.createElement('option');
          shapeSelectOption.value = type;
          shapeSelectOption.innerHTML = type;
          shapeType.append(shapeSelectOption);
      });
      shapeType.selectedIndex = shapeTypes.findIndex((el) => {
          return el == shape.kind;
      });
      shapeType.onchange = () => {
          if (isTwo(shape)) {
              shape.kind = shapeTypes[shapeType.selectedIndex];
              compileShader();
          }
          else {
              shapeDiv.remove();
              onDelete(shapeTypes[shapeType.selectedIndex]);
          }
      };
      shapeDiv.append(shapeType);
      if (shape.id != '0') {
          // Main content
          const deleteButton = document.createElement('button');
          deleteButton.className = 'button-delete';
          deleteButton.innerText = 'Delete';
          deleteButton.onclick = () => {
              shapeDiv.remove();
              onDelete();
          };
          shapeDiv.append(deleteButton);
      }
      const content = document.createElement('div');
      const hideButton = document.createElement('button');
      hideButton.innerHTML = 'hide';
      hideButton.className = 'button-hide';
      hideButton.onclick = () => {
          if (content.style.display === 'none') {
              content.style.display = 'block';
              hideButton.innerHTML = 'hide';
          }
          else {
              content.style.display = 'none';
              hideButton.innerHTML = 'show';
          }
      };
      shapeDiv.append(hideButton);
      appendTransform(shape.transform, shapeDiv);
      content.style.margin = '0';
      content.id = shape.id;
      const separator = document.createElement('hr');
      content.append(separator);
      shapeDiv.append(content);
      return content;
  }
  function appendTransform(transform, parent) {
      const transformDiv = document.createElement('div');
      const hideButton = document.createElement('button');
      hideButton.innerHTML = 'show transforms';
      hideButton.className = 'button-hide';
      hideButton.onclick = () => {
          if (transformDiv.style.display === 'none') {
              transformDiv.style.display = 'block';
              hideButton.innerHTML = 'hide transforms';
          }
          else {
              transformDiv.style.display = 'none';
              hideButton.innerHTML = 'show transforms';
          }
      };
      parent.append(hideButton);
      appendSVec('position', transform.position, transformDiv);
      appendSVec('rotation', transform.rotation, transformDiv);
      appendTextEditor('scale', transform.scale, transformDiv, (newVal) => {
          transform.scale.s = newVal;
          compileShader();
      });
      transformDiv.style.display = 'none';
      parent.append(transformDiv);
  }

  const defaultTransform = { position: new svec3(), rotation: new svec3(), scale: new S(1) };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function replacer(key, value) {
      if (value instanceof Map)
          return {
              dataType: 'Map',
              value: Array.from(value.entries())
          };
      if (isSVec(value))
          return {
              dataType: 'SVec',
              value: { x: value.x, y: value.y, z: value.z }
          };
      if (isVec(value))
          return {
              dataType: 'Vec',
              value: { x: value.x, y: value.y, z: value.z }
          };
      if (isS(value))
          return {
              dataType: 'S',
              value: { s: value.s }
          };
      return value;
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function reviver(key, value) {
      if (typeof value === 'object' && value !== null && value.dataType === 'Map')
          return new Map(value.value);
      if (typeof value === 'object' && value !== null && value.dataType === 'SVec')
          return new svec3(value.value.x, value.value.y, value.value.z);
      if (typeof value === 'object' && value !== null && value.dataType === 'Vec')
          return new vec3(value.value.x, value.value.y, value.value.z);
      if (typeof value === 'object' && value !== null && value.dataType === 'S')
          return new S(value.value.s);
      Id.setMax(+value.id);
      return value;
  }
  function getRoot() {
      const savedSceneString = window.localStorage.getItem('root');
      if (savedSceneString) {
          return JSON.parse(savedSceneString, reviver);
      }
      return { kind: 'Union', shapes: new Map(), smoothness: new S(0), transform: defaultTransform, id: Id.new };
  }
  const root = { kind: 'Union', shapes: new Map(), smoothness: new S(0), transform: defaultTransform, id: 'shapes' };
  const content = getRoot();
  const savedSceneString = window.localStorage.getItem('camera');
  if (savedSceneString) {
      const camInfo = JSON.parse(savedSceneString, reviver);
      cam.camSet(camInfo.loc, camInfo.at, camInfo.up, cam.pos, cam.userLoc);
  }
  const shapeTypes = [
      'Sphere',
      'Box',
      'Torus',
      'InfCylinder',
      'Cone',
      'Plane',
      'Triangle',
      'Union',
      'Subtraction',
      'Xor',
      'Intersection',
      'Custom'
  ];
  function isTwo(shape) {
      return shape.kind == 'Union' || shape.kind == 'Xor' || shape.kind == 'Intersection' || shape.kind == 'Subtraction';
  }
  function shapeAdd(shape, target) {
      target.shapes.set(shape.id, shape);
      const parentDiv = document.getElementById(target.id);
      const shapeDiv = appendShapeDiv(shape, parentDiv, (newKind) => {
          saveEvent({ kind: 'delete', parent: target, child: shape });
          target.shapes.delete(shape.id);
          if (newKind) {
              addShape(newKind, target);
          }
          compileShader();
      });
      const tShape = shape;
      //for (const [key, value] of Object.entries(shape)) {
      let key;
      for (key in tShape) {
          const capturedKey = key; // needed for lambdas
          switch (typeof tShape[key] // v should be any, but who knows?
          ) {
              case 'number':
                  appendTextEditor(key, tShape[capturedKey], shapeDiv, (newVal) => {
                      tShape[capturedKey] = newVal;
                      compileShader();
                  });
                  break;
              case 'string':
                  if (key == 'content')
                      appendTextEditor(key, tShape[capturedKey], shapeDiv, (newString) => {
                          tShape[capturedKey] = newString;
                          compileShader();
                      });
                  break;
              case 'object':
                  if (isSVec(tShape[key])) {
                      appendSVec(key.toString(), tShape[capturedKey], shapeDiv);
                  }
                  else if (key == 'shapes') {
                      appendShapes(key, shape, shapeDiv);
                  }
                  else if (isS(tShape[key])) {
                      appendTextEditor(key, tShape[capturedKey], shapeDiv, (newVal) => {
                          tShape[capturedKey].s = newVal;
                          compileShader();
                      });
                  }
                  else
                      break;
          }
      }
  }
  function addShape(shapeType, target) {
      let shape;
      // Order of field declaration is very important
      switch (shapeType) {
          case 'Sphere':
              shape = { kind: shapeType, position: new svec3(), radius: new S(1), transform: defaultTransform, id: Id.new };
              break;
          case 'Box':
              shape = { kind: shapeType, radius: new S(0), sideLengths: new svec3('1', '1', '1'), transform: defaultTransform, id: Id.new };
              break;
          case 'Torus':
              shape = { kind: shapeType, radius1: new S(1), radius2: new S(0.3), transform: defaultTransform, id: Id.new };
              break;
          case 'InfCylinder':
              shape = { kind: shapeType, point1: new svec3(), point2: new svec3(), transform: defaultTransform, id: Id.new };
              break;
          case 'Cone':
              shape = { kind: shapeType, point1: new svec3(), point2: new svec3(), radius1: new S(1), radius2: new S(1), transform: defaultTransform, id: Id.new };
              break;
          case 'Plane':
              shape = { kind: shapeType, normal: new svec3(0, 1, 0), height: new S(0), transform: defaultTransform, id: Id.new };
              break;
          case 'Triangle':
              shape = {
                  kind: shapeType,
                  point1: new svec3('1', '0', '0'),
                  point2: new svec3('1', '0', '0'),
                  point3: new svec3('1', '0', '0'),
                  transform: defaultTransform,
                  id: Id.new
              };
              break;
          case 'Union':
          case 'Xor':
          case 'Intersection':
          case 'Subtraction':
              shape = { kind: shapeType, shapes: new Map(), smoothness: new S(0), transform: defaultTransform, id: Id.new };
              break;
          case 'Custom':
              shape = { kind: shapeType, content: '', transform: defaultTransform, id: Id.new };
              break;
      }
      shapeAdd(shape, target);
      saveEvent({ kind: 'add', child: shape, parent: target });
  }
  function recursiveShapeAdd(shape, target) {
      shapeAdd(shape, target);
      if (isTwo(shape))
          for (const shp of shape.shapes)
              recursiveShapeAdd(shp[1], shape);
  }
  function shapeDelete(c, p) {
      document.getElementById(c.id)?.parentElement?.remove();
      p.shapes.delete(c.id);
  }
  function generateWorldMapRec(shape = content, transform) {
      if (!shape)
          return null;
      console.log('generated', shape);
      if (shape.kind == 'Custom') {
          if (shape.content === '')
              return null;
          else
              return shape.content;
      }
      let result = shape.kind + '(';
      if (!isTwo(shape))
          result +=
              /*`
  vec3(
      inverse(
          MatrRotateXYZ(
              D2R(${transform.rotation.x}),
              D2R(${transform.rotation.y}),
              D2R(${transform.rotation.z})) *
          MatrTranslate(${transform.position.str()})
          )
      )*/
              `
            vec3(inverse(MatrRotateTranslate(
                D2R(${transform.rotation.x}),D2R(${transform.rotation.y}),D2R(${transform.rotation.z}),
                ${transform.position.x},${transform.position.y},${transform.position.z}
            )) * vec4(p,0))/${transform.scale.s},
            `;
      let key;
      for (key in shape) {
          let added = true;
          switch (typeof shape[key] // v should be any, but who knows?
          ) {
              case 'number':
                  if (shape.kind != 'Xor')
                      //kostyl
                      result += shape[key].toFixed(1);
                  break;
              case 'object':
                  if (isSVec(shape[key])) {
                      result += shape[key].str();
                  }
                  else if (key == 'shapes') {
                      const shp = shape;
                      if (shp.shapes.size == 2) {
                          const localResults = [];
                          for (const iShape of shp.shapes) {
                              localResults.push(generateWorldMapRec(iShape[1], transform));
                          }
                          if (localResults[0] === null)
                              return localResults[1];
                          else if (localResults[1] === null)
                              return localResults[0];
                          else
                              result += localResults; // they are automatically merged with ','
                      }
                      else if (shp.shapes.size == 1) {
                          for (const iShape of shp.shapes)
                              return generateWorldMapRec(iShape[1], transform);
                          result = result.substring(0, result.length - 1); // remove trailing comma
                      }
                      else if (shp.shapes.size > 2) {
                          // I substitute existing shape with one of kind: {kind:same, shapes: [shapes[0], shapes[1..]] ...}
                          for (const [Key, Val] of shp.shapes) {
                              const copiedMap = new Map(shp.shapes);
                              const shapesMap = new Map();
                              shapesMap.set(Key, Val);
                              copiedMap.delete(Key);
                              let id;
                              shapesMap.set((id = Id.new), {
                                  kind: shp.kind,
                                  transform: shp.transform,
                                  shapes: copiedMap,
                                  smoothness: shp.smoothness,
                                  id: id
                              });
                              return generateWorldMapRec({
                                  kind: shp.kind,
                                  transform: shp.transform,
                                  shapes: shapesMap,
                                  smoothness: shp.smoothness,
                                  id: Id.new
                              }, transform);
                          }
                      }
                      else
                          return null;
                  }
                  else if (isS(shape[key])) {
                      result += shape[key].s;
                  }
                  else
                      added = false;
                  break;
              default:
                  added = false;
          }
          if (added)
              result += ',';
      }
      result = result.substring(0, result.length - 1); // remove trailing comma
      result += ')*' + transform.scale;
      console.log('added shape', result);
      return result;
  }
  function generateWorldMap(shape = content) {
      const worldMap = generateWorldMapRec(shape, defaultTransform);
      if (!worldMap)
          return '0.';
      const worldDiv = document.getElementById('world');
      if (worldDiv)
          worldDiv.innerText = worldMap;
      return worldMap;
  }
  function initShapes() {
      recursiveShapeAdd(content, root);
  }
  function saveScene() {
      //alert(JSON.stringify(root, replacer))
      window.localStorage.setItem('root', JSON.stringify(content, replacer)); // first element in root
      window.localStorage.setItem('camera', JSON.stringify(cam, replacer));
  }

  let gl;
  let programInfo;
  let buffers;
  function loadShader(type, source) {
      const shader = gl.createShader(type);
      if (!shader)
          return null;
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
          alert(`An error occurred compiling the shaders: ${gl.getShaderInfoLog(shader)}`);
          gl.deleteShader(shader);
          return null;
      }
      return shader;
  }
  function initShaderProgram(vsSource, fsSource) {
      const vertexShader = loadShader(gl.VERTEX_SHADER, vsSource);
      if (!vertexShader)
          return null;
      const fragmentShader = loadShader(gl.FRAGMENT_SHADER, fsSource);
      if (!fragmentShader)
          return null;
      const shaderProgram = gl.createProgram();
      if (!shaderProgram)
          return null;
      gl.attachShader(shaderProgram, vertexShader);
      gl.attachShader(shaderProgram, fragmentShader);
      gl.linkProgram(shaderProgram);
      if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
          alert(`Unable to initialize the shader program: ${gl.getProgramInfoLog(shaderProgram)}`);
          return null;
      }
      return shaderProgram;
  }
  function initPositionBuffer() {
      const positionBuffer = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
      const positions = [1.0, 1.0, -1.0, 1.0, 1.0, -1.0, -1.0, -1.0];
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);
      //gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer)
      return positionBuffer;
  }
  function initCameraBuffer() {
      const uniformBuffer = gl.createBuffer();
      const data = new Float32Array([cam.loc.arr4(), cam.dir.arr4(), cam.right.arr4(), cam.up.arr4(), cam.matrView.m.flat()].flat());
      const size = data.byteLength;
      gl.bindBuffer(gl.UNIFORM_BUFFER, uniformBuffer);
      gl.bufferData(gl.UNIFORM_BUFFER, size, gl.STATIC_DRAW);
      gl.bindBufferRange(gl.UNIFORM_BUFFER, 0, uniformBuffer, 0, size);
      gl.uniformBlockBinding(programInfo.program, gl.getUniformBlockIndex(programInfo.program, 'CameraBlock'), 0);
      gl.bindBuffer(gl.UNIFORM_BUFFER, uniformBuffer);
      gl.bufferSubData(gl.UNIFORM_BUFFER, 0, data);
      gl.bindBuffer(gl.UNIFORM_BUFFER, null);
      return uniformBuffer;
  }
  function initBuffers() {
      return {
          position: initPositionBuffer(),
          camera: initCameraBuffer()
      };
  }
  // Tell WebGL how to pull out the positions from the position
  // buffer into the vertexPosition attribute.
  function setPositionAttribute(buffers, programInfo) {
      const numComponents = 2; // pull out 2 values per iteration
      const type = gl.FLOAT; // the data in the buffer is 32bit floats
      const normalize = false; // don't normalize
      const stride = 0; // how many bytes to get from one set of values to the next
      const offset = 0; // how many bytes inside the buffer to start from
      gl.bindBuffer(gl.ARRAY_BUFFER, buffers.position);
      gl.vertexAttribPointer(programInfo.attribLocations.vertexPosition, numComponents, type, normalize, stride, offset);
      gl.enableVertexAttribArray(programInfo.attribLocations.vertexPosition);
  }
  async function compileShader(worldMap = generateWorldMap()) {
      const vsResponse = await fetch('./march.vertex.glsl');
      const vsText = await vsResponse.text();
      console.log(vsText);
      const fsResponse = await fetch('./march.fragment.glsl');
      let fsText = await fsResponse.text();
      if (!worldMap)
          worldMap = '0.'; //'Sphere(p, vec3(0), 1.)'
      // Replace the constant with the actual data
      fsText = fsText.replace('WORLD_MAP', worldMap);
      console.log(fsText);
      const shaderProgram = initShaderProgram(vsText, fsText);
      if (!shaderProgram)
          return;
      programInfo = {
          program: shaderProgram,
          attribLocations: {
              vertexPosition: gl.getAttribLocation(shaderProgram, 'in_pos')
          },
          uniformLocations: {
              frameW: gl.getUniformLocation(shaderProgram, 'frameW'),
              frameH: gl.getUniformLocation(shaderProgram, 'frameH'),
              time: gl.getUniformLocation(shaderProgram, 'time')
          }
      };
      buffers = initBuffers();
  }
  async function init() {
      const canvas = document.querySelector('#glcanvas');
      if (!canvas)
          return;
      gl = canvas.getContext('webgl2');
      // Only continue if WebGL is available and working
      if (gl === null) {
          alert('Unable to initialize WebGL. Your browser or machine may not support it.');
          return;
      }
      await compileShader();
  }
  function render() {
      gl.clearColor(0.8, 0.47, 0.3, 1.0);
      gl.clearDepth(1.0); // Clear everything
      gl.enable(gl.DEPTH_TEST); // Enable depth testing
      gl.depthFunc(gl.LEQUAL); // Near things obscure far things
      gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
      setPositionAttribute(buffers, programInfo);
      gl.useProgram(programInfo.program);
      gl.bindBuffer(gl.UNIFORM_BUFFER, buffers.camera);
      gl.bufferSubData(gl.UNIFORM_BUFFER, 0, new Float32Array([cam.loc.arr4(), cam.dir.arr4(), cam.right.arr4(), cam.up.arr4(), cam.matrView.m.flat()].flat()));
      gl.uniform1i(programInfo.uniformLocations.frameW, window.innerWidth);
      gl.uniform1i(programInfo.uniformLocations.frameH, window.innerHeight);
      gl.uniform1i(programInfo.uniformLocations.time, Date.now()); // not sure
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      ControlCamera();
      //buffers.camera
      //gl.deleteBuffer(camBuffer)
      window.requestAnimationFrame(render);
  }

  exports.isMouseOverCanvas = false;
  const eventHistory = Array();
  const undoHistory = Array();
  function saveEvent(event) {
      eventHistory.push(event);
      undoHistory.length = 0;
      updateHistory();
  }
  function updateHistory() {
      const historyDiv = document.getElementById('history');
      if (!historyDiv) {
          alert('Missing id=history container');
          return;
      }
      historyDiv.innerHTML = '';
      const allEvents = eventHistory.concat([null], undoHistory);
      let eType = 'history';
      for (const event of allEvents) {
          const eventDiv = document.createElement('div');
          if (event == null) {
              eventDiv.className = 'history-current';
              eventDiv.innerText = '*';
              eType = 'undo';
          }
          else {
              eventDiv.className = eType + '-event';
              eventDiv.innerText = event.kind + ' ' + event.child.kind + event.child.id + ' of ' + event.parent.kind + event.parent.id;
          }
          historyDiv.append(eventDiv);
      }
  }
  function Undo() {
      const lastEvent = eventHistory.pop();
      if (!lastEvent) {
          alert('History empty!');
          return;
      }
      switch (lastEvent.kind) {
          case 'delete':
              shapeAdd(lastEvent.child, lastEvent.parent);
              compileShader();
              break;
          case 'add':
              shapeDelete(lastEvent.child, lastEvent.parent);
              compileShader();
              break;
      }
      undoHistory.push(lastEvent);
      updateHistory();
  }
  function Redo() {
      const lastEvent = undoHistory.pop();
      if (!lastEvent) {
          alert('Undo history empty!');
          return;
      }
      switch (lastEvent.kind) {
          case 'delete':
              shapeDelete(lastEvent.child, lastEvent.parent);
              compileShader();
              break;
          case 'add':
              shapeAdd(lastEvent.child, lastEvent.parent);
              compileShader();
              break;
      }
      eventHistory.push(lastEvent);
      updateHistory();
  }
  async function main() {
      const canvas = document.querySelector('#glcanvas');
      canvas.addEventListener('mouseleave', () => {
          exports.isMouseOverCanvas = false;
      });
      canvas.addEventListener('mouseover', () => {
          exports.isMouseOverCanvas = true;
      });
      await init();
      initShapes();
      render();
  }
  window.addEventListener('load', main);
  //window.addEventListener('resize', resize)
  window.onbeforeunload = saveScene;
  window.onmousemove = handleMouseMove;
  window.onmousedown = handleMouseDown;
  window.onmouseup = handleMouseUp;
  window.onscroll = () => {
      if (exports.isMouseOverCanvas)
          window.scroll(0, 0);
  };
  window.addEventListener('contextmenu', (e) => e.preventDefault());
  window.addEventListener('wheel', handleMouseZoom);
  window.addEventListener('keyup', handleKeyUp);
  window.addEventListener('keydown', handleKeyDown);
  function KeyPress(e) {
      if (e.keyCode == 90 && e.ctrlKey && e.shiftKey)
          Redo();
      else if (e.keyCode == 90 && e.ctrlKey)
          Undo();
      else if (e.key == 'r' && e.ctrlKey)
          cam.setDef();
      //else if (e.key == 'W') saveScene()
  }
  document.onkeydown = KeyPress;
  const tips = document.getElementById('checkout')?.childNodes;
  if (tips != undefined) {
      for (const tip of tips) {
          if (tip)
              tip.onclick = () => {
                  navigator.clipboard.writeText(tip.innerText);
              };
      }
  }

  exports.main = main;
  exports.saveEvent = saveEvent;

  return exports;

})({});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXMiOlsiLi4vbXRoLnRzIiwiLi4vY2FtZXJhLnRzIiwiLi4vY29udHJvbHMudHMiLCIuLi9odG1sLXV0aWxzLnRzIiwiLi4vc2hhcGVzLnRzIiwiLi4vYW5pbS50cyIsIi4uL21haW4udHMiXSwic291cmNlc0NvbnRlbnQiOltudWxsLG51bGwsbnVsbCxudWxsLG51bGwsbnVsbCxudWxsXSwibmFtZXMiOlsiaXNNb3VzZU92ZXJDYW52YXMiLCJjb250cm9scy5oYW5kbGVNb3VzZU1vdmUiLCJjb250cm9scy5oYW5kbGVNb3VzZURvd24iLCJjb250cm9scy5oYW5kbGVNb3VzZVVwIiwiY29udHJvbHMuaGFuZGxlTW91c2Vab29tIiwiY29udHJvbHMuaGFuZGxlS2V5VXAiLCJjb250cm9scy5oYW5kbGVLZXlEb3duIiwiY29udHJvbHMuY2FtIl0sIm1hcHBpbmdzIjoiOzs7UUFBYSxDQUFDLENBQUE7RUFDRixJQUFBLEVBQUUsQ0FBUTtNQUNsQixLQUFLLEdBQUcsR0FBWSxDQUFBO0VBQ3BCLElBQUEsV0FBQSxDQUFZLElBQXFCLElBQUksRUFBQTtVQUNqQyxJQUFJLE9BQU8sQ0FBQyxJQUFJLFFBQVE7RUFBRSxZQUFBLElBQUksQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFBOztFQUNoQyxZQUFBLElBQUksQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUFBO09BQzlCO0VBQ0QsSUFBQSxJQUFJLENBQUMsR0FBQTtFQUNELFFBQUEsSUFBSSxLQUFLLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDO2NBQUUsT0FBTyxJQUFJLENBQUMsRUFBRSxDQUFBOztjQUM5QixPQUFPLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBRSxFQUFFLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQTtPQUNwQztNQUNELElBQUksQ0FBQyxDQUFDLElBQUksRUFBQTtFQUNOLFFBQUEsSUFBSSxDQUFDLEVBQUUsR0FBRyxJQUFJLENBQUE7T0FDakI7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RCxNQUFNLEdBQUcsTUFBTSxJQUFJLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFBO0VBQ3JELENBQUE7UUFDWSxJQUFJLENBQUE7RUFDYixJQUFBLENBQUMsQ0FBUTtFQUNULElBQUEsQ0FBQyxDQUFRO0VBQ1QsSUFBQSxDQUFDLENBQVE7TUFDVCxLQUFLLEdBQUcsTUFBZSxDQUFBO01BQ3ZCLFdBQVksQ0FBQSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsRUFBQTtFQUMzQixRQUFBLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFBO0VBQ1YsUUFBQSxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQTtFQUNWLFFBQUEsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUE7T0FDYjtFQUNELElBQUEsR0FBRyxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFBO01BQ3BDLElBQUksR0FBRyxDQUFDLENBQVksR0FBQSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQTtFQUNyRCxJQUFBLEdBQUcsR0FBRyxNQUFNLENBQUEsS0FBQSxFQUFRLElBQUksQ0FBQyxDQUFDLENBQUksQ0FBQSxFQUFBLElBQUksQ0FBQyxDQUFDLENBQUEsQ0FBQSxFQUFJLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQTtFQUNqRCxJQUFBLElBQUksR0FBRyxNQUFNLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUE7RUFDN0MsSUFBQSxFQUFFLEdBQUcsQ0FBQyxHQUFTLEtBQUssSUFBSSxDQUFDLENBQUMsSUFBSSxHQUFHLENBQUMsQ0FBQyxJQUFJLElBQUksQ0FBQyxDQUFDLElBQUksR0FBRyxDQUFDLENBQUMsSUFBSSxJQUFJLENBQUMsQ0FBQyxJQUFJLEdBQUcsQ0FBQyxDQUFDLENBQUE7RUFDekUsSUFBQSxHQUFHLEdBQUcsQ0FBQyxHQUFTLEtBQUssSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQTtFQUM3RSxJQUFBLEdBQUcsR0FBRyxDQUFDLEdBQVMsS0FBSyxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFBO01BQzdFLEdBQUcsR0FBRyxDQUFDLENBQVMsS0FBSyxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFBO0VBQ2pFLElBQUEsR0FBRyxHQUFHLENBQUMsQ0FBUyxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxJQUFJLElBQUksRUFBRSxDQUFDLENBQUE7TUFDekYsR0FBRyxHQUFHLE1BQU0sSUFBSSxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQTtFQUMvQyxJQUFBLEdBQUcsR0FBRyxDQUFDLEdBQVMsS0FBSyxJQUFJLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQTtNQUNyRSxLQUFLLEdBQUcsQ0FBQyxHQUFTLEtBQUssSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQTtNQUNsSSxJQUFJLEdBQUcsTUFBTSxJQUFJLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQTtFQUNoRSxJQUFBLEdBQUcsR0FBRyxNQUFNLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDLENBQUE7RUFDbEMsSUFBQSxTQUFTLEdBQUcsTUFBTSxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFBO0VBQ3RDLElBQUEsSUFBSSxHQUFHLENBQUMsR0FBUyxFQUFFLENBQUMsR0FBRyxHQUFHLEtBQUssSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQTtFQUNwSSxJQUFBLE9BQU8sQ0FBQyxDQUFRLEVBQUE7VUFDWixNQUFNLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFBO0VBRWxGLFFBQUEsT0FBTyxJQUFJLElBQUksQ0FDWCxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUM5RSxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUM5RSxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUNqRixDQUFBO09BQ0o7RUFDRCxJQUFBLEtBQUssQ0FBQyxHQUFTLEVBQUUsRUFBRSxHQUFHLElBQUksSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUE7RUFDbkMsUUFBQSxJQUFJLEdBQUcsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLElBQUksSUFBSSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUM7RUFBRSxZQUFBLE9BQU8sQ0FBQyxDQUFBO1VBQ2pELElBQUksS0FBSyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsSUFBSSxJQUFJLENBQUMsR0FBRyxFQUFFLEdBQUcsR0FBRyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQTtFQUMvRCxRQUFBLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQztjQUFFLEtBQUssR0FBRyxDQUFDLEtBQUssQ0FBQTtFQUMvQyxRQUFBLE9BQU8sS0FBSyxDQUFBO09BQ2Y7RUFDRCxJQUFBLElBQUksR0FBRyxHQUFBO0VBQ0gsUUFBQSxPQUFPLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUE7T0FDMUM7RUFDRCxJQUFBLElBQUksR0FBRyxHQUFBO0VBQ0gsUUFBQSxPQUFPLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUE7T0FDMUM7RUFDRCxJQUFBLElBQUksR0FBRyxHQUFBO0VBQ0gsUUFBQSxPQUFPLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUE7T0FDMUM7RUFFSixDQUFBO1FBQ1ksS0FBSyxDQUFBO0VBQ2Q7Ozs7O0VBS0Y7RUFDRSxJQUFBLENBQUMsR0FBRztFQUNBLFFBQUEsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7RUFDWixRQUFBLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0VBQ1osUUFBQSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztFQUNaLFFBQUEsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7T0FDZixDQUFBO0VBQ0QsSUFBQSxXQUFBLENBQVksQ0FBYyxFQUFBO0VBQ3RCLFFBQUEsSUFBSSxDQUFDO0VBQUUsWUFBQSxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQTtPQUNwQjtFQUNELElBQUEsTUFBTSxHQUFHLE1BQ0wsU0FBUztFQUNULFFBQUEsSUFBSSxDQUFDLENBQUM7RUFDRCxhQUFBLEdBQUcsQ0FBQyxDQUFDLEdBQUcsS0FBSyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQzlCLGFBQUEsSUFBSSxFQUFFO2VBQ04sSUFBSSxDQUFDLEdBQUcsQ0FBQztFQUNkLFFBQUEsR0FBRyxDQUFBO01BRVAsT0FBTyxTQUFTLENBQUMsR0FBUyxFQUFBO1VBQ3RCLE9BQU8sSUFBSSxLQUFLLENBQUM7RUFDYixZQUFBLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0VBQ1osWUFBQSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztFQUNaLFlBQUEsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7RUFDWixZQUFBLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDO0VBQzNCLFNBQUEsQ0FBQyxDQUFBO09BQ0w7TUFFRCxPQUFPLEtBQUssQ0FBQyxHQUFTLEVBQUE7VUFDbEIsT0FBTyxJQUFJLEtBQUssQ0FBQztjQUNiLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztjQUNoQixDQUFDLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7Y0FDaEIsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDO0VBQ2hCLFlBQUEsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7RUFDZixTQUFBLENBQUMsQ0FBQTtPQUNMO01BQ0QsT0FBTyxPQUFPLENBQUMsYUFBcUIsRUFBQTtFQUNoQyxRQUFBLE1BQU0sQ0FBQyxHQUFHLElBQUksS0FBSyxFQUFFLENBQUE7VUFDckIsTUFBTSxDQUFDLEdBQUcsQ0FBQyxhQUFhLEdBQUcsR0FBRyxJQUFJLElBQUksQ0FBQyxFQUFFLENBQUE7VUFDekMsTUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQTtVQUN4QixNQUFNLE1BQU0sR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFBO1VBRTFCLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsTUFBTSxDQUFBO1VBQ2xCLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsTUFBTSxDQUFBO1VBQ2xCLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFBO1VBQ2hCLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUE7RUFDakIsUUFBQSxPQUFPLENBQUMsQ0FBQTtPQUNYO01BQ0QsT0FBTyxPQUFPLENBQUMsYUFBcUIsRUFBQTtFQUNoQyxRQUFBLE1BQU0sQ0FBQyxHQUFHLElBQUksS0FBSyxFQUFFLENBQUE7VUFDckIsTUFBTSxDQUFDLEdBQUcsQ0FBQyxhQUFhLEdBQUcsR0FBRyxJQUFJLElBQUksQ0FBQyxFQUFFLENBQUE7VUFDekMsTUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQTtVQUN4QixNQUFNLE1BQU0sR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFBO1VBRTFCLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsTUFBTSxDQUFBO1VBQ2xCLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsTUFBTSxDQUFBO1VBQ2xCLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUE7VUFDakIsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUE7RUFFaEIsUUFBQSxPQUFPLENBQUMsQ0FBQTtPQUNYO01BQ0QsT0FBTyxPQUFPLENBQUMsYUFBcUIsRUFBQTtFQUNoQyxRQUFBLE1BQU0sQ0FBQyxHQUFHLElBQUksS0FBSyxFQUFFLENBQUE7VUFDckIsTUFBTSxDQUFDLEdBQUcsQ0FBQyxhQUFhLEdBQUcsR0FBRyxJQUFJLElBQUksQ0FBQyxFQUFFLENBQUE7VUFDekMsTUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQTtVQUN4QixNQUFNLE1BQU0sR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFBO1VBRTFCLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsTUFBTSxDQUFBO1VBQ2xCLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsTUFBTSxDQUFBO1VBQ2xCLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFBO1VBQ2hCLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUE7RUFFakIsUUFBQSxPQUFPLENBQUMsQ0FBQTtPQUNYO0VBQ0QsSUFBQSxPQUFPLE1BQU0sQ0FBQyxhQUFxQixFQUFFLENBQU8sRUFBQTtVQUN4QyxNQUFNLENBQUMsR0FBRyxDQUFDLGFBQWEsR0FBRyxHQUFHLElBQUksSUFBSSxDQUFDLEVBQUUsQ0FBQTtVQUN6QyxNQUFNLEVBQUUsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFBO1VBQ3RCLE1BQU0sRUFBRSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUE7VUFFdEIsT0FBTyxJQUFJLEtBQUssQ0FBQztjQUNiLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUMsQ0FBQztjQUNoRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLEVBQUUsRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDLENBQUM7Y0FDaEcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLEVBQUUsRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0VBQ2hHLFlBQUEsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7RUFDZixTQUFBLENBQUMsQ0FBQTtPQUNMO0VBQ0Q7Ozs7Ozs7Ozs7O0VBV0Y7RUFFRSxJQUFBLFNBQVMsQ0FBQyxHQUFXLEVBQUUsR0FBVyxFQUFFLEdBQVcsRUFBRSxHQUFXLEVBQUUsR0FBVyxFQUFFLEdBQVcsRUFBRSxHQUFXLEVBQUUsR0FBVyxFQUFFLEdBQVcsRUFBQTtFQUN6SCxRQUFBLE9BQU8sR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLENBQUE7T0FDbkg7TUFDRCxNQUFNLEdBQUE7VUFDRixRQUNJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7Y0FDVCxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2NBQ2hKLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7a0JBQ1QsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztjQUNoSixDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2tCQUNULElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7Y0FDaEosQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztrQkFDVCxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQ25KO09BQ0o7TUFDRCxPQUFPLEdBQUE7RUFDSCxRQUFBLE1BQU0sR0FBRyxHQUFHLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQTtFQUN6QixRQUFBLE1BQU0sQ0FBQyxHQUFHLElBQUksS0FBSyxFQUFFLENBQUE7VUFFckIsSUFBSSxHQUFHLElBQUksQ0FBQztjQUFFLE9BQU8sSUFBSSxLQUFLLEVBQUUsQ0FBQTtFQUVoQyxRQUFBLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2NBQ0wsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFBO0VBQ3ZKLFFBQUEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7Y0FDTCxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUE7RUFDdkosUUFBQSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztjQUNMLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQTtFQUN2SixRQUFBLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2NBQ0wsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFBO0VBQ3ZKLFFBQUEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7Y0FDTCxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUE7RUFDdkosUUFBQSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztjQUNMLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQTtFQUN2SixRQUFBLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2NBQ0wsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFBO0VBQ3ZKLFFBQUEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7Y0FDTCxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUE7RUFDdkosUUFBQSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztjQUNMLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQTtFQUN2SixRQUFBLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2NBQ0wsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFBO0VBQ3ZKLFFBQUEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7Y0FDTCxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUE7RUFDdkosUUFBQSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztjQUNMLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQTtFQUN2SixRQUFBLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2NBQ0wsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFBO0VBQ3ZKLFFBQUEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7Y0FDTCxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUE7RUFDdkosUUFBQSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztjQUNMLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQTtFQUN2SixRQUFBLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2NBQ0wsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFBO0VBRXZKLFFBQUEsT0FBTyxDQUFDLENBQUE7T0FDWDtFQUNELElBQUEsR0FBRyxDQUFDLENBQVEsRUFBQTtFQUNSLFFBQUEsTUFBTSxDQUFDLEdBQUcsSUFBSSxLQUFLLEVBQUUsQ0FBQTtFQUVyQixRQUFBLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFBO0VBQ3JILFFBQUEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUE7RUFDckgsUUFBQSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQTtFQUNySCxRQUFBLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFBO0VBRXJILFFBQUEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUE7RUFDckgsUUFBQSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQTtFQUNySCxRQUFBLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFBO0VBQ3JILFFBQUEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUE7RUFFckgsUUFBQSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQTtFQUNySCxRQUFBLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFBO0VBQ3JILFFBQUEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUE7RUFDckgsUUFBQSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQTtFQUVySCxRQUFBLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFBO0VBQ3JILFFBQUEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUE7RUFDckgsUUFBQSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQTtFQUNySCxRQUFBLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFBO0VBRXJILFFBQUEsT0FBTyxDQUFDLENBQUE7T0FDWDtFQUVELElBQUEsSUFBSSxDQUFDLEdBQVMsRUFBRSxFQUFRLEVBQUUsR0FBUyxFQUFBO0VBQy9CLFFBQUEsTUFBTSxHQUFHLEdBQUcsRUFBRSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxTQUFTLEVBQUUsRUFDL0IsS0FBSyxHQUFHLEdBQUcsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsU0FBUyxFQUFFLEVBQ2xDLEVBQUUsR0FBRyxLQUFLLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFBO1VBRXpCLE9BQU8sSUFBSSxLQUFLLENBQUM7RUFDYixZQUFBLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUM7RUFDMUIsWUFBQSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDO0VBQzFCLFlBQUEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQztjQUMxQixDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEVBQUUsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUM7RUFDbkQsU0FBQSxDQUFDLENBQUE7T0FDTDtFQUNKOztRQzFUWSxNQUFNLENBQUE7TUFDZixRQUFRLEdBQUcsR0FBRyxDQUFBO01BQ2QsUUFBUSxHQUFHLEdBQUcsQ0FBQTtNQUNkLFdBQVcsR0FBRyxLQUFLLENBQUE7TUFDbkIsTUFBTSxHQUFHLEVBQUUsQ0FBQTtNQUNYLE1BQU0sR0FBRyxFQUFFLENBQUE7RUFDWCxJQUFBLFFBQVEsR0FBRyxJQUFJLEtBQUssRUFBRSxDQUFBO0VBQ3RCLElBQUEsUUFBUSxHQUFHLElBQUksS0FBSyxFQUFFLENBQUE7RUFDdEIsSUFBQSxNQUFNLEdBQUcsSUFBSSxLQUFLLEVBQUUsQ0FBQTtNQUNwQixFQUFFLEdBQUcsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDLFFBQVEsRUFBRSxDQUFBO01BQzdCLElBQUksR0FBb0MsVUFBVSxDQUFBO0VBQ2xELElBQUEsT0FBTyxHQUFHLElBQUksSUFBSSxFQUFFLENBQUE7RUFDcEIsSUFBQSxHQUFHLEdBQUcsSUFBSSxJQUFJLEVBQUUsQ0FBQTtFQUNoQixJQUFBLEVBQUUsR0FBRyxJQUFJLElBQUksRUFBRSxDQUFBO01BQ2YsS0FBSyxHQUFHLENBQUMsQ0FBQTtFQUNULElBQUEsR0FBRyxHQUFHLElBQUksSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUE7RUFDdEYsSUFBQSxFQUFFLEdBQUcsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQTtFQUNsRixJQUFBLEtBQUssR0FBRyxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxD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QUE7TUFDNUIsR0FBRyxDQUFDLEVBQUUsR0FBRyxHQUFHLENBQUMsRUFBRSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUMsS0FBSyxDQUFDLE9BQU8sR0FBRyxVQUFVLEdBQUcsS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUE7RUFDOUUsSUFBQSxHQUFHLENBQUMsRUFBRSxHQUFHLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQTtNQUU1QixHQUFHLENBQUMsS0FBSyxHQUFHLEdBQUcsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxLQUFLLENBQUMsT0FBTyxHQUFHLFVBQVUsR0FBRyxLQUFLLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQTs7RUFHcEY7Ozs7RUFJQTtFQUNBLElBQUEsR0FBRyxDQUFDLEVBQUUsR0FBRyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUE7RUFDNUIsSUFBQSxHQUFHLENBQUMsRUFBRSxHQUFHLEdBQUcsQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxLQUFLLENBQUMsT0FBTyxHQUFHLFVBQVUsR0FBRyxLQUFLLENBQUMsRUFBRSxFQUFFLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFBO0VBRXhGLElBQUEsR0FBRyxDQUFDLEVBQUUsR0FBRyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUE7RUFFNUIsSUFBQSxLQUFLLElBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsR0FBRyxPQUFPLEdBQUcsQ0FBQyxDQUFBOztFQUV4QyxJQUFBLEdBQUcsQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDLEdBQUc7RUFDWixTQUFBLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLGFBQWEsQ0FBQyxHQUFHLEtBQUssQ0FBQyxDQUFDO0VBQ3pFLFNBQUEsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsYUFBYSxDQUFDLEdBQUcsS0FBSyxDQUFDLENBQUM7RUFDekUsU0FBQSxHQUFHLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxhQUFhLENBQUMsR0FBRyxLQUFLLENBQUMsQ0FBQztFQUMzRSxTQUFBLEdBQUcsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLGFBQWEsQ0FBQyxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUE7O0VBR2hGLElBQUEsR0FBRyxDQUFDLEVBQUUsR0FBRyxHQUFHLENBQUMsRUFBRTtFQUNWLFNBQUEsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsYUFBYSxDQUFDLEdBQUcsS0FBSyxDQUFDLENBQUM7RUFDekUsU0FBQSxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxhQUFhLENBQUMsR0FBRyxLQUFLLENBQUMsQ0FBQztFQUN6RSxTQUFBLEdBQUcsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLGFBQWEsQ0FBQyxHQUFHLEtBQUssQ0FBQyxDQUFDO0VBQzNFLFNBQUEsR0FBRyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsYUFBYSxDQUFDLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQTtFQUVoRixJQUFBLEtBQUssSUFBSSxJQUFJLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxHQUFHLE9BQU8sR0FBRyxDQUFDLENBQUE7TUFFeEMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQyxFQUFFLEVBQUUsR0FBRyxDQUFDLEVBQUUsRUFBRSxHQUFHLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQTtFQUM3RCxDQUFDO0VBRUQsU0FBUyxPQUFPLEdBQUE7O01BRVosR0FBRyxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsRUFBRSxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUE7OztNQUlwRCxHQUFHLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLFVBQVUsR0FBRyxLQUFLLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQTs7TUFFL0UsR0FBRyxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxVQUFVLEdBQUcsS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUE7RUFDL0UsSUFBQSxHQUFHLENBQUMsT0FBTyxHQUFHLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLENBQUMsU0FBUyxFQUFFLENBQUE7RUFDdkMsSUFBQSxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUE7O0VBRWpCLElBQUEsR0FBRyxDQUFDLE9BQU8sR0FBRyxHQUFHLENBQUMsT0FBTztFQUNwQixTQUFBLEdBQUcsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLGFBQWEsQ0FBQyxHQUFHLEtBQUssQ0FBQyxDQUFDO0VBQzdFLFNBQUEsR0FBRyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsS0FBSyxDQUFDLENBQUM7RUFDakQsU0FBQSxHQUFHLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLEtBQUssQ0FBQyxDQUFDO0VBQzVFLFNBQUEsR0FBRyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxNQUFN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QUFDLE9BQU8sR0FBRyxHQUFHLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQTs7O01BSXpELEdBQUcsQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsVUFBVSxHQUFHLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFBOztFQUUvRSxJQUFBLEdBQUcsQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsVUFBVSxHQUFHLEtBQUssQ0FBQyxFQUFFLEVBQUUsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUE7RUFFekYsSUFBQSxHQUFHLENBQUMsRUFBRSxHQUFHLEdBQUcsQ0FBQyxPQUFPLENBQUE7RUFDcEIsSUFBQSxHQUFHLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLENBQUMsU0FBUyxFQUFFLENBQUE7RUFDbkMsSUFBQSxHQUFHLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQTtFQUNsQyxJQUFBLE1BQU0sVUFBVSxHQUFHLElBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFBO0VBQ3BELElBQUEsR0FBRyxDQUFDLEtBQUssR0FBRyxVQUFVLENBQUMsS0FBSyxDQUFDLElBQUksSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQTtFQUMvQyxJQUFBLEdBQUcsQ0FBQyxFQUFFLEdBQUcsR0FBRyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFBO0VBQ3JDLENBQUM7V0FFZSxhQUFhLEdBQUE7TUFDekIsSUFBSUEseUJBQWlCLEVBQUU7RUFDbkIsUUFBQSxJQUFJLEdBQUcsQ0FBQyxJQUFJLElBQUksVUFBVTtFQUFFLFlBQUEsY0FBYyxFQUFFLENBQUE7RUFDdkMsYUFBQSxJQUFJLEdBQUcsQ0FBQyxJQUFJLElBQUksU0FBUztFQUFFLFlBQUEsT0FBTyxFQUFFLENBQUE7O0VBQ3BDLFlBQUEsSUFBSSxFQUFFLENBQUE7T0FDZDtFQUNMOztRQzdMYSxFQUFFLENBQUE7RUFDSCxJQUFBLE9BQU8sU0FBUyxHQUFHLENBQUMsQ0FBQTtFQUM1QixJQUFBLFdBQVcsR0FBRyxHQUFBO1VBQ1YsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFBO1VBQ2hCLE9BQU8sQ0FBQyxJQUFJLENBQUMsU0FBUyxHQUFHLENBQUMsRUFBRSxRQUFRLEVBQUUsQ0FBQTtPQUN6QztNQUNELE9BQU8sTUFBTSxDQUFJLEtBQVEsRUFBQTtFQUNyQixRQUFBLElBQUksT0FBTyxLQUFLLElBQUksUUFBUSxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxJQUFJLEtBQUssSUFBSSxJQUFJLENBQUMsU0FBUztFQUFFLFlBQUEsSUFBSSxDQUFDLFNBQVMsR0FBRyxLQUFLLEdBQUcsQ0FBQyxDQUFBO09BQ3ZHOztFQUVDLFNBQVUsZ0JBQWdCLENBQUMsSUFBWSxFQUFFLE9BQTRCLEVBQUUsTUFBc0IsRUFBRSxRQUFrQyxFQUFBO01BQ25JLE1BQU0sTUFBTSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLENBQUE7RUFDOUMsSUFBQSxNQUFNLENBQUMsSUFBSSxHQUFHLE1BQU0sQ0FBQTtFQUNwQixJQUFBLE1BQU0sQ0FBQyxLQUFLLEdBQUcsT0FBTyxDQUFDLFFBQVEsRUFBRSxDQUFBO0VBQ2pDLElBQUEsTUFBTSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUE7RUFDekIsSUFBQSxNQUFNLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxHQUFHLENBQUE7RUFDbEIsSUFBQSxNQUFNLENBQUMsUUFBUSxHQUFHLE1BQUs7RUFDbkIsUUFBQSxRQUFRLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFBO0VBQzFCLEtBQUMsQ0FBQTtNQUVELE1BQU0sS0FBSyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLENBQUE7RUFDN0MsSUFBQSxLQUFLLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQTtFQUN4QixJQUFBLEtBQUssQ0FBQyxPQUFPLEdBQUcsTUFBTSxDQUFDLEVBQUUsQ0FBQTtFQUV6QixJQUFBLE1BQU0sQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUE7RUFDcEIsSUFBQSxNQUFNLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFBO0VBQ3pCLENBQUM7V0FrQmUsVUFBVSxDQUFDLElBQVksRUFBRSxNQUFhLEVBQUUsTUFBc0IsRUFBQTtNQUMxRSxNQUFNLFFBQVEsR0FBbUIsUUFBUSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQTtNQUU5RCxNQUFNLEtBQUssR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQyxDQUFBO0VBQzVDLElBQUEsS0FBSyxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUE7RUFDeEIsSUFBQSxRQUFRLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFBO0VBRXRCLElBQUEsZ0JBQWdCLENBQUMsR0FBRyxFQUFFLE1BQU0sQ0FBQyxDQUFDLEVBQUUsUUFBUSxFQUFFLENBQUMsTUFBTSxLQUFJO0VBQ2pELFFBQUEsTUFBTSxDQUFDLENBQUMsR0FBRyxNQUFNLENBQUE7RUFDakIsUUFBQSxhQUFhLEVBQUUsQ0FBQTtFQUNuQixLQUFDLENBQUMsQ0FBQTtFQUNGLElBQUEsZ0JBQWdCLENBQUMsR0FBRyxFQUFFLE1BQU0sQ0FBQyxDQUFDLEVBQUUsUUFBUSxFQUFFLENBQUMsTUFBTSxLQUFJO0VBQ2pELFFBQUEsTUFBTSxDQUFDLENBQUMsR0FBRyxNQUFNLENBQUE7RUFDakIsUUFBQSxhQUFhLEVBQUUsQ0FBQTtFQUNuQixLQUFDLENBQUMsQ0FBQTtFQUNGLElBQUEsZ0JBQWdCLENBQUMsR0FBRyxFQUFFLE1BQU0sQ0FBQyxDQUFDLEVBQUUsUUFBUSxFQUFFLENBQUMsTUFBTSxLQUFJO0VBQ2pELFFBQUEsTUFBTSxDQUFDLENBQUMsR0FBRyxNQUFNLENBQUE7RUFDakIsUUFBQSxhQUFhLEVBQUUsQ0FBQTtFQUNuQixLQUFDLENBQUMsQ0FBQTtFQUVGLElBQUEsTUFBTSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQTtFQUMzQixDQUFDO1dBdUJlLFlBQVksQ0FBQyxJQUFZLEVBQUUsS0FBVSxFQUFFLE1BQXNCLEVBQUE7TUFDekUsTUFBTSxRQUFRLEdBQW1CLFFBQVEsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUE7TUFFOUQsTUFBTSxjQUFjLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUMsQ0FBQTtFQUN2RCxJQUFBLGNBQWMsQ0FBQyxTQUFTLEdBQUcsS0FBSyxDQUFBO0VBQ2hDLElBQUEsY0FBYyxDQUFDLFNBQVMsR0FBRyxZQUFZLENBQUE7RUFDdkMsSUFBQSxjQUFjLENBQUMsT0FBTyxHQUFHLE1BQUs7VUFDMUIsUUFBUSxDQUFDLFVBQVUsQ0FBQyxlQUFlLENBQUMsYUFBYSxDQUFDLEVBQUUsS0FBWSxDQUFDLENBQUE7RUFDakUsUUFBQSxhQUFhLEVBQUUsQ0FBQTtFQUNuQixLQUFDLENBQUE7RUFDRCxJQUFBLFFBQVEsQ0FBQyxNQUFNLENBQUMsY0FBYyxDQUFDLENBQUE7TUFFL0IsTUFBTSxlQUFlLEdBQXNCLFFBQVEsQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDLENBQUE7RUFDM0UsSUFBQSxVQUFVLENBQUMsT0FBTyxDQUFDLENBQUMsU0FBUyxLQUFJO1VBQzdCLE1BQU0saUJBQWlCLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUMsQ0FBQTtFQUMxRCxRQUFBLGlCQUFpQixDQUFDLEtBQUssR0FBRyxTQUFTLENBQUE7RUFDbkMsUUFBQSxpQkFBaUIsQ0FBQyxTQUFTLEdBQUcsU0FBUyxDQUFBO0VBQ3ZDLFFBQUEsZUFBZSxDQUFDLE1BQU0sQ0FBQyxpQkFBaUIsQ0FBQyxDQUFBO0VBQzdDLEtBQUMsQ0FBQyxDQUFBO0VBQ0YsSUFBQSxRQUFRLENBQUMsTUFBTSxDQUFDLGVBQWUsQ0FBQyxDQUFBO0VBRWhDLElBQUEsTUFBTSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQTtFQUMzQixDQUFDO1dBRWUsY0FBYyxDQUFDLEtBQVksRUFBRSxNQUFzQixFQUFFLFFBQXVDLEVBQUE7TUFDeEcsTUFBTSxRQUFRLEdBQW1CLFFBQVEsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUE7RUFFOUQsSUFBQSxRQUFRLENBQUMsU0FBUyxHQUFHLE9BQU8sQ0FBQTtNQUM1QixRQUFRLENBQUMsU0FBUyxHQUFHLE1BQU0sR0FBRyxLQUFLLENBQUMsRUFBRSxDQUFBO0VBQ3RDLElBQUEsTUFBTSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQTtNQUV2QixNQUFNLFNBQVMsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxDQUFBO0VBQ2xELElBQUEsU0FBUyxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFBO0VBQzlCLElBQVksS0FBSyxDQUFDLEtBQUssRUFBQztFQUN4QixJQUFBLFVBQVUsQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFJLEtBQUk7VUFDeEIsTUFBTSxpQkFBaUIsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxDQUFBO0VBQzFELFFBQUEsaUJBQWlCLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQTtFQUM5QixRQUFBLGlCQUFpQixDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUE7RUFDbEMsUUFBQSxTQUFTLENBQUMsTUFBTSxDQUFDLGlCQUFpQixDQUFDLENBQUE7RUFDdkMsS0FBQyxDQUFDLENBQUE7TUFDRixTQUFTLENBQUMsYUFBYSxHQUFHLFVBQVUsQ0FBQyxTQUFTLENBQUMsQ0FBQyxFQUFFLEtBQUk7RUFDbEQsUUFBQSxPQUFPLEVBQUUsSUFBSSxLQUFLLENBQUMsSUFBSSxDQUFBO0VBQzNCLEtBQUMsQ0FBQyxDQUFBO0VBQ0YsSUFBQSxTQUFTLENBQUMsUUFBUSxHQUFHLE1BQUs7RUFDdEIsUUFBQSxJQUFJLEtBQUssQ0FBQyxLQUFLLENBQUMsRUFBRTtjQUNkLEtBQUssQ0FBQyxJQUFJLEdBQUcsVUFBVSxDQUFDLFNBQVMsQ0FBQyxhQUFhLENBQUMsQ0FBQTtFQUNoRCxZQUFBLGFBQWEsRUFBRSxDQUFBO1dBQ2xCO2VBQU07Y0FDSCxRQUFRLENBQUMsTUFBTSxFQUFFLENBQUE7Y0FDakIsUUFBUSxDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQTtXQUNoRDtFQUNMLEtBQUMsQ0FBQTtFQUNELElBQUEsUUFBUSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQTtFQUUxQixJQUFBLElBQUksS0FBSyxDQUFDLEVBQUUsSUFBSSxHQUFHLEVBQUU7O1VBRWpCLE1BQU0sWUFBWSxHQUFzQixRQUFRLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxDQUFBO0VBQ3hFLFFBQUEsWUFBWSxDQUFDLFNBQVMsR0FBRyxlQUFlLENBQUE7RUFDeEMsUUFBQSxZQUFZLENBQUMsU0FBUyxHQUFHLFFBQVEsQ0FBQTtFQUNqQyxRQUFBLFlBQVksQ0FBQyxPQUFPLEdBQUcsTUFBSztjQUN4QixRQUFRLENBQUMsTUFBTSxFQUFFLENBQUE7RUFDakIsWUFBQSxRQUFRLEVBQUUsQ0FBQTtFQUNkLFNBQUMsQ0FBQTtFQUNELFFBQUEsUUFBUSxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUMsQ0FBQTtPQUNoQztNQUNELE1BQU0sT0FBTyxHQUFtQixRQUFRLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFBO01BQzdELE1BQU0sVUFBVSxHQUFzQixRQUFRLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxDQUFBO0VBQ3RFLElBQUEsVUFBVSxDQUFDLFNBQVMsR0FBRyxNQUFNLENBQUE7RUFDN0IsSUFBQSxVQUFVLENBQUMsU0FBUyxHQUFHLGFBQWEsQ0FBQTtFQUNwQyxJQUFBLFVBQVUsQ0FBQyxPQUFPLEdBQUcsTUFBSztVQUN0QixJQUFJLE9BQU8sQ0FBQyxLQUFLLENBQUMsT0FBTyxLQUFLLE1BQU0sRUFBRTtFQUNsQyxZQUFBLE9BQU8sQ0FBQyxLQUFLLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQTtFQUMvQixZQUFBLFVBQVUsQ0FBQyxTQUFTLEdBQUcsTUFBTSxDQUFBO1dBQ2hDO2VBQU07RUFDSCxZQUFBLE9BQU8sQ0FBQyxLQUFLLENBQUMsT0FBTyxHQUFHLE1BQU0sQ0FBQTtFQUM5QixZQUFBLFVBQVUsQ0FBQyxTQUFTLEdBQUcsTUFBTSxDQUFBO1dBQ2hDO0VBQ0wsS0FBQyxDQUFBO0VBQ0QsSUFBQSxRQUFRLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxDQUFBO0VBRTNCLElBQUEsZUFBZSxDQUFDLEtBQUssQ0FBQyxTQUFTLEVBQUUsUUFBUSxDQUFDLENBQUE7RUFFMUMsSUFBQSxPQUFPLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxHQUFHLENBQUE7RUFDMUIsSUFBQSxPQUFPLENBQUMsRUFBRSxHQUFHLEtBQUssQ0FBQyxFQUFFLENBQUE7TUFDckIsTUFBTSxTQUFTLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQTtFQUM5QyxJQUFBLE9BQU8sQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUE7RUFFekIsSUFBQSxRQUFRLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFBO0VBRXhCLElBQUEsT0FBTyxPQUFPLENBQUE7RUFDbEIsQ0FBQztFQUVlLFNBQUEsZUFBZSxDQUFDLFNBQTBCLEVBQUUsTUFBc0IsRUFBQTtNQUM5RSxNQUFNLFlBQVksR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFBO01BRWxELE1BQU0sVUFBVSxHQUFzQixRQUFRLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxDQUFBO0VBQ3RFLElBQUEsVUFBVSxDQUFDLFNBQVMsR0FBRyxpQkFBaUIsQ0FBQTtFQUN4QyxJQUFBLFVBQVUsQ0FBQyxTQUFTLEdBQUcsYUFBYSxDQUFBO0VBQ3BDLElBQUEsVUFBVSxDQUFDLE9BQU8sR0FBRyxNQUFLO1VBQ3RCLElBQUksWUFBWSxDQUFDLEtBQUssQ0FBQyxPQUFPLEtBQUssTUFBTSxFQUFFO0VBQ3ZDLFlBQUEsWUFBWSxDQUFDLEtBQUssQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFBO0VBQ3BDLFlBQUEsVUFBVSxDQUFDLFNBQVMsR0FBRyxpQkFBaUIsQ0FBQTtXQUMzQztlQUFNO0VBQ0gsWUFBQSxZQUFZLENBQUMsS0FBSyxDQUFDLE9BQU8sR0FBRyxNQUFNLENBQUE7RUFDbkMsWUFBQSxVQUFVLENBQUMsU0FBUyxHQUFHLGlCQUFpQixDQUFBO1dBQzNDO0VBQ0wsS0FBQyxDQUFBO0VBQ0QsSUFBQSxNQUFNLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxDQUFBO01BRXpCLFVBQVUsQ0FBQyxVQUFVLEVBQUUsU0FBUyxDQUFDLFFBQVEsRUFBRSxZQUFZLENBQUMsQ0FBQTtNQUN4RCxVQUFVLENBQUMsVUFBVSxFQUFFLFNBQVMsQ0FBQyxRQUFRLEVBQUUsWUFBWSxDQUFDLENBQUE7RUFDeEQsSUFBQSxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsU0FBUyxDQUFDLEtBQUssRUFBRSxZQUFZLEVBQUUsQ0FBQyxNQUFNLEtBQUk7RUFDaEUsUUFBQSxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUMsR0FBRyxNQUFNLENBQUE7RUFDMUIsUUFBQSxhQUFhLEVBQUUsQ0FBQTtFQUNuQixLQUFDLENBQUMsQ0FBQTtFQUVGLElBQUEsWUFBWSxDQUFDLEtBQUssQ0FBQyxPQUFPLEdBQUcsTUFBTSxDQUFBO0VBQ25DLElBQUEsTUFBTSxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUMsQ0FBQTtFQUMvQjs7RUNsSEEsTUFBTSxnQkFBZ0IsR0FBb0IsRUFBRSxRQUFRLEVBQUUsSUFBSSxLQUFLLEVBQUUsRUFBRSxRQUFRLEVBQUUsSUFBSSxLQUFLLEVBQUUsRUFBRSxLQUFLLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQTtFQUczRztFQUNBLFNBQVMsUUFBUSxDQUFDLEdBQVcsRUFBRSxLQUFVLEVBQUE7TUFDckMsSUFBSSxLQUFLLFlBQVksR0FBRztVQUNwQixPQUFPO0VBQ0gsWUFBQSxRQUFRLEVBQUUsS0FBSztjQUNmLEtBQUssRUFBRSxLQUFLLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLEVBQUUsQ0FBQztXQUNyQyxDQUFBO01BQ0wsSUFBSSxNQUFNLENBQUMsS0FBSyxDQUFDO1VBQ2IsT0FBTztFQUNILFlBQUEsUUFBUSxFQUFFLE1BQU07RUFDaEIsWUFBQSxLQUFLLEVBQUUsRUFBRSxDQUFDLEVBQUUsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsS0FBSyxDQUFDLENBQUMsRUFBRTtXQUNoRCxDQUFBO01BQ0wsSUFBSSxLQUFLLENBQUMsS0FBSyxDQUFDO1VBQ1osT0FBTztFQUNILFlBQUEsUUFBUSxFQUFFLEtBQUs7RUFDZixZQUFBLEtBQUssRUFBRSxFQUFFLENBQUMsRUFBRSxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxLQUFLLENBQUMsQ0FBQyxFQUFFO1dBQ2hELENBQUE7TUFFTCxJQUFJLEdBQUcsQ0FBQyxLQUFLLENBQUM7VUFDVixPQUFPO0VBQ0gsWUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFlBQUEsS0FBSyxFQUFFLEVBQUUsQ0FBQyxFQUFFLEtBQUssQ0FBQyxDQUFDLEVBQUU7V0FDeEIsQ0FBQTtFQUNMLElBQUEsT0FBTyxLQUFLLENBQUE7RUFDaEIsQ0FBQztFQUNEO0VBQ0EsU0FBUyxPQUFPLENBQUMsR0FBVyxFQUFFLEtBQVUsRUFBQTtFQUNwQyxJQUFBLElBQUksT0FBTyxLQUFLLEtBQUssUUFBUSxJQUFJLEtBQUssS0FBSyxJQUFJLElBQUksS0FBSyxDQUFDLFFBQVEsS0FBSyxLQUFLO0VBQUUsUUFBQSxPQUFPLElBQUksR0FBRyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQTtFQUN4RyxJQUFBLElBQUksT0FBTyxLQUFLLEtBQUssUUFBUSxJQUFJLEtBQUssS0FBSyxJQUFJLElBQUksS0FBSyxDQUFDLFFBQVEsS0FBSyxNQUFNO1VBQUUsT0FBTyxJQUFJLEtBQUssQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFBO0VBQzNJLElBQUEsSUFBSSxPQUFPLEtBQUssS0FBSyxRQUFRLElBQUksS0FBSyxLQUFLLElBQUksSUFBSSxLQUFLLENBQUMsUUFBUSxLQUFLLEtBQUs7VUFBRSxPQUFPLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUE7RUFDekksSUFBQSxJQUFJLE9BQU8sS0FBSyxLQUFLLFFBQVEsSUFBSSxLQUFLLEtBQUssSUFBSSxJQUFJLEtBQUssQ0FBQyxRQUFRLEtBQUssR0FBRztVQUFFLE9BQU8sSUFBSSxDQUFDLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQTtNQUN0RyxFQUFFLENBQUMsTUFBTSxDQUFDLENBQUUsS0FBSyxDQUFDLEVBQWEsQ0FBQyxDQUFBO0VBRWhDLElBQUEsT0FBTyxLQUFLLENBQUE7RUFDaEIsQ0FBQztFQUNELFNBQVMsT0FBTyxHQUFBO01BQ1osTUFBTSxnQkFBZ0IsR0FBRyxNQUFNLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQTtNQUM1RCxJQUFJLGdCQUFnQixFQUFFO1VBQ2xCLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxnQkFBZ0IsRUFBRSxPQUFPLENBQUMsQ0FBQTtPQUMvQztFQUNELElBQUEsT0FBTyxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLElBQUksR0FBRyxFQUFFLEVBQUUsVUFBVSxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLFNBQVMsRUFBRSxnQkFBZ0IsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDLEdBQUcsRUFBRSxDQUFBO0VBQzlHLENBQUM7RUFDRCxNQUFNLElBQUksR0FBUSxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLElBQUksR0FBRyxFQUFFLEVBQUUsVUFBVSxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLFNBQVMsRUFBRSxnQkFBZ0IsRUFBRSxFQUFFLEVBQUUsUUFBUSxFQUFFLENBQUE7RUFDdkgsTUFBTSxPQUFPLEdBQVUsT0FBTyxFQUFFLENBQUE7RUFFaEMsTUFBTSxnQkFBZ0IsR0FBRyxNQUFNLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQTtFQUM5RCxJQUFJLGdCQUFnQixFQUFFO01BQ2xCLE1BQU0sT0FBTyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsZ0JBQWdCLEVBQUUsT0FBTyxDQUFDLENBQUE7TUFDckQsR0FBRyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLE9BQU8sQ0FBQyxFQUFFLEVBQUUsT0FBTyxDQUFDLEVBQUUsRUFBRSxHQUFHLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQTtFQUN6RSxDQUFDO0VBRU0sTUFBTSxVQUFVLEdBQUc7TUFDdEIsUUFBUTtNQUNSLEtBQUs7TUFDTCxPQUFPO01BQ1AsYUFBYTtNQUNiLE1BQU07TUFDTixPQUFPO01BQ1AsVUFBVTtNQUNWLE9BQU87TUFDUCxhQUFhO01BQ2IsS0FBSztNQUNMLGNBQWM7TUFDZCxRQUFRO0dBQ0YsQ0FBQTtFQUdKLFNBQVUsS0FBSyxDQUFDLEtBQVksRUFBQTtNQUM5QixPQUFPLEtBQUssQ0FBQyxJQUFJLElBQUksT0FBTyxJQUFJLEtBQUssQ0FBQyxJQUFJLElBQUksS0FBSyxJQUFJLEtBQUssQ0FBQyxJQUFJLElBQUksY0FBYyxJQUFJLEtBQUssQ0FBQyxJQUFJLElBQUksYUFBYSxDQUFBO0VBQ3RILENBQUM7RUFDZSxTQUFBLFFBQVEsQ0FBa0IsS0FBWSxFQUFFLE1BQVcsRUFBQTtNQUMvRCxNQUFNLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsRUFBRSxFQUFFLEtBQUssQ0FBQyxDQUFBO01BRWxDLE1BQU0sU0FBUyxHQUFHLFFBQVEsQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBbUIsQ0FBQTtNQUN0RSxNQUFNLFFBQVEsR0FBRyxjQUFjLENBQUMsS0FBSyxFQUFFLFNBQVMsRUFBRSxDQUFDLE9BQW1CLEtBQUk7RUFDdEUsUUFBQSxTQUFTLENBQUMsRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxDQUFDLENBQUE7VUFDM0QsTUFBTSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFBO1VBQzlCLElBQUksT0FBTyxFQUFFO0VBQ1QsWUFBQSxRQUFRLENBQUMsT0FBTyxFQUFFLE1BQU0sQ0FBQyxDQUFBO1dBQzVCO0VBQ0QsUUFBQSxhQUFhLEVBQUUsQ0FBQTtFQUNuQixLQUFDLENBQUMsQ0FBQTtNQUVGLE1BQU0sTUFBTSxHQUFHLEtBQVUsQ0FBQTs7RUFHekIsSUFBQSxJQUFJLEdBQVksQ0FBQTtFQUVoQixJQUFBLEtBQUssR0FBRyxJQUFJLE1BQU0sRUFBRTtFQUNoQixRQUFBLE1BQU0sV0FBVyxHQUFZLEdBQUcsQ0FBQTtFQUNoQyxRQUFBLFFBQ0ksT0FBTyxNQUFNLENBQUMsR0FBRyxDQUFDOztFQUVsQixZQUFBLEtBQUssUUFBUTtFQUNULGdCQUFBLGdCQUFnQixDQUFDLEdBQUcsRUFBRSxNQUFNLENBQUMsV0FBVyxDQUFzQixFQUFFLFFBQVEsRUFBRSxDQUFDLE1BQU0sS0FBSTtFQUMvRSxvQkFBQSxNQUFNLENBQUMsV0FBVyxDQUF1QixHQUFHLE1BQU0sQ0FBQTtFQUNwRCxvQkFBQSxhQUFhLEVBQUUsQ0FBQTtFQUNuQixpQkFBQyxDQUFDLENBQUE7a0JBQ0YsTUFBSztFQUNULFlBQUEsS0FBSyxRQUFRO2tCQUNULElBQUksR0FBRyxJQUFJLFNBQVM7RUFDaEIsb0JBQUEsZ0JBQWdCLENBQUMsR0FBRyxFQUFFLE1BQU0sQ0FBQyxXQUFXLENBQXNCLEVBQUUsUUFBUSxFQUFFLENBQUMsU0FBUyxLQUFJO0VBQ2xGLHdCQUFBLE1BQU0sQ0FBQyxXQUFXLENBQXVCLEdBQUcsU0FBUyxDQUFBO0VBQ3ZELHdCQUFBLGFBQWEsRUFBRSxDQUFBO0VBQ25CLHFCQUFDLENBQUMsQ0FBQTtrQkFDTixNQUFLO0VBQ1QsWUFBQSxLQUFLLFFBQVE7a0JBQ1QsSUFBSSxNQUFNLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUU7RUFDckIsb0JBQUEsVUFBVSxDQUFDLEdBQUcsQ0FBQyxRQUFRLEVBQUUsRUFBRSxNQUFNLENBQUMsV0FBVyxDQUFxQixFQUFFLFFBQVEsQ0FBQyxDQUFBO21CQUNoRjtFQUFNLHFCQUFBLElBQUksR0FBRyxJQUFJLFFBQVEsRUFBRTtFQUN4QixvQkFBQSxZQUFZLENBQUMsR0FBRyxFQUFFLEtBQVksRUFBRSxRQUFRLENBQUMsQ0FBQTttQkFDNUM7dUJBQU0sSUFBSSxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUU7RUFDekIsb0JBQUEsZ0JBQWdCLENBQUMsR0FBRyxFQUFFLE1BQU0sQ0FBQyxXQUFXLENBQWlCLEVBQUUsUUFBUSxFQUFFLENBQUMsTUFBTSxLQUFJO0VBQzFFLHdCQUFBLE1BQU0sQ0FBQyxXQUFXLENBQWtCLENBQUMsQ0FBQyxHQUFHLE1BQU0sQ0FBQTtFQUNqRCx3QkFBQSxhQUFhLEVBQUUsQ0FBQTtFQUNuQixxQkFBQyxDQUFDLENBQUE7bUJBQ0w7O3NCQUFNLE1BQUs7V0FDbkI7T0FDSjtFQUNMLENBQUM7RUFDZSxTQUFBLFFBQVEsQ0FBQyxTQUFvQixFQUFFLE1BQVcsRUFBQTtFQUN0RCxJQUFBLElBQUksS0FBWSxDQUFBOztNQUVoQixRQUFRLFNBQVM7RUFDYixRQUFBLEtBQUssUUFBUTtFQUNULFlBQUEsS0FBSyxHQUFHLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxRQUFRLEVBQUUsSUFBSSxLQUFLLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsU0FBUyxFQUFFLGdCQUFnQixFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsR0FBRyxFQUFFLENBQUE7Y0FDN0csTUFBSztFQUNULFFBQUEsS0FBSyxLQUFLO0VBQ04sWUFBQSxLQUFLLEdBQUcsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLE1BQU0sRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxXQUFXLEVBQUUsSUFBSSxLQUFLLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLENBQUMsRUFBRSxTQUFTLEVBQUUsZ0JBQWdCLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxHQUFHLEVBQUUsQ0FBQTtjQUM3SCxNQUFLO0VBQ1QsUUFBQSxLQUFLLE9BQU87RUFDUixZQUFBLEtBQUssR0FBRyxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsT0FBTyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLE9BQU8sRUFBRSxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRSxTQUFTLEVBQUUsZ0JBQWdCLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxHQUFHLEVBQUUsQ0FBQTtjQUM1RyxNQUFLO0VBQ1QsUUFBQSxLQUFLLGFBQWE7RUFDZCxZQUFBLEtBQUssR0FBRyxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsTUFBTSxFQUFFLElBQUksS0FBSyxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksS0FBSyxFQUFFLEVBQUUsU0FBUyxFQUFFLGdCQUFnQixFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsR0FBRyxFQUFFLENBQUE7Y0FDOUcsTUFBSztFQUNULFFBQUEsS0FBSyxNQUFNO2NBQ1AsS0FBSyxHQUFHLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxNQUFNLEVBQUUsSUFBSSxLQUFLLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxLQUFLLEVBQUUsRUFBRSxPQUFPLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsT0FBTyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLFNBQVMsRUFBRSxnQkFBZ0IsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDLEdBQUcsRUFBRSxDQUFBO2NBQ3BKLE1BQUs7RUFDVCxRQUFBLEtBQUssT0FBTztFQUNSLFlBQUEsS0FBSyxHQUFHLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxNQUFNLEVBQUUsSUFBSSxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxNQUFNLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsU0FBUyxFQUFFLGdCQUFnQixFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsR0FBRyxFQUFFLENBQUE7Y0FDbEgsTUFBSztFQUNULFFBQUEsS0FBSyxVQUFVO0VBQ1gsWUFBQSxLQUFLLEdBQUc7RUFDSixnQkFBQSxJQUFJLEVBQUUsU0FBUztrQkFDZixNQUFNLEVBQUUsSUFBSSxLQUFLLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLENBQUM7a0JBQ2hDLE1BQU0sRUFBRSxJQUFJLEtBQUssQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQztrQkFDaEMsTUFBTSxFQUFFLElBQUksS0FBSyxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDO0VBQ2hDLGdCQUFBLFNBQVMsRUFBRSxnQkFBZ0I7a0JBQzNCLEVBQUUsRUFBRSxFQUFFLENBQUMsR0FBRztlQUNiLENBQUE7Y0FDRCxNQUFLO0VBQ1QsUUFBQSxLQUFLLE9BQU8sQ0FBQztFQUNiLFFBQUEsS0FBSyxLQUFLLENBQUM7RUFDWCxRQUFBLEtBQUssY0FBYyxDQUFDO0VBQ3BCLFFBQUEsS0FBSyxhQUFhO0VBQ2QsWUFBQSxLQUFLLEdBQUcsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLE1BQU0sRUFBRSxJQUFJLEdBQUcsRUFBRSxFQUFFLFVBQVUsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxTQUFTLEVBQUUsZ0JBQWdCLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxHQUFHLEVBQUUsQ0FBQTtjQUM3RyxNQUFLO0VBQ1QsUUFBQSxLQUFLLFFBQVE7Y0FDVCxLQUFLLEdBQUcsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLE9BQU8sRUFBRSxFQUFFLEVBQUUsU0FBUyxFQUFFLGdCQUFnQixFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsR0FBRyxFQUFFLENBQUE7Y0FDakYsTUFBSztPQUNaO0VBQ0QsSUFBQSxRQUFRLENBQUMsS0FBSyxFQUFFLE1BQU0sQ0FBQyxDQUFBO0VBQ3ZCLElBQUEsU0FBUyxDQUFDLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsQ0FBQyxDQUFBO0VBQzVELENBQUM7RUFDRCxTQUFTLGlCQUFpQixDQUFDLEtBQVksRUFBRSxNQUFXLEVBQUE7RUFDaEQsSUFBQSxRQUFRLENBQUMsS0FBSyxFQUFFLE1BQU0sQ0FBQyxDQUFBO01BQ3ZCLElBQUksS0FBSyxDQUFDLEtBQUssQ0FBQztFQUFFLFFBQUEsS0FBSyxNQUFNLEdBQUcsSUFBSyxLQUFhLENBQUMsTUFBTTtjQUFFLGlCQUFpQixDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxLQUFZLENBQUMsQ0FBQTtFQUN0RyxDQUFDO0VBQ2UsU0FBQSxXQUFXLENBQUMsQ0FBUSxFQUFFLENBQU0sRUFBQTtFQUN4QyxJQUFBLFFBQVEsQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLGFBQWEsRUFBRSxNQUFNLEVBQUUsQ0FBQTtNQUN0RCxDQUFDLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUE7RUFDekIsQ0FBQztFQUNELFNBQVMsbUJBQW1CLENBQWtCLEtBQWtCLEdBQUEsT0FBWSxFQUFFLFNBQTBCLEVBQUE7RUFDcEcsSUFBQSxJQUFJLENBQUMsS0FBSztFQUFFLFFBQUEsT0FBTyxJQUFJLENBQUE7RUFDdkIsSUFBQSxPQUFPLENBQUMsR0FBRyxDQUFDLFdBQVcsRUFBRSxLQUFLLENBQUMsQ0FBQTtFQUMvQixJQUFBLElBQUksS0FBSyxDQUFDLElBQUksSUFBSSxRQUFRLEVBQUU7RUFDeEIsUUFBQSxJQUFJLEtBQUssQ0FBQyxPQUFPLEtBQUssRUFBRTtFQUFFLFlBQUEsT0FBTyxJQUFJLENBQUE7O2NBQ2hDLE9BQU8sS0FBSyxDQUFDLE9BQU8sQ0FBQTtPQUM1QjtFQUNELElBQUEsSUFBSSxNQUFNLEdBQVcsS0FBSyxDQUFDLElBQUksR0FBRyxHQUFHLENBQUE7RUFFckMsSUFBQSxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQztVQUNiLE1BQU07RUFDRjs7Ozs7Ozs7O0VBU0w7RUFDSyxZQUFBLENBQUE7O0FBRVUsb0JBQUEsRUFBQSxTQUFTLENBQUMsUUFBUSxDQUFDLENBQUMsU0FBUyxTQUFTLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBUyxNQUFBLEVBQUEsU0FBUyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUE7QUFDbEYsZ0JBQUEsRUFBQSxTQUFTLENBQUMsUUFBUSxDQUFDLENBQUMsSUFBSSxTQUFTLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBSSxDQUFBLEVBQUEsU0FBUyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUE7OEJBQ3hELFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFBO2FBQ2xDLENBQUE7RUFFVCxJQUFBLElBQUksR0FBWSxDQUFBO0VBRWhCLElBQUEsS0FBSyxHQUFHLElBQUksS0FBSyxFQUFFO1VBQ2YsSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFBO0VBQ2hCLFFBQUEsUUFDSSxPQUFPLEtBQUssQ0FBQyxHQUFHLENBQUM7O0VBRWpCLFlBQUEsS0FBSyxRQUFRO0VBQ1QsZ0JBQUEsSUFBSSxLQUFLLENBQUMsSUFBSSxJQUFJLEtBQUs7O3NCQUVuQixNQUFNLElBQUssS0FBSyxDQUFDLEdBQUcsQ0FBWSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQTtrQkFDL0MsTUFBSztFQUNULFlBQUEsS0FBSyxRQUFRO2tCQUNULElBQUksTUFBTSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFO3NCQUNwQixNQUFNLElBQUssS0FBSyxDQUFDLEdBQUcsQ0FBc0IsQ0FBQyxHQUFHLEVBQUUsQ0FBQTttQkFDbkQ7RUFBTSxxQkFBQSxJQUFJLEdBQUcsSUFBSSxRQUFRLEVBQUU7c0JBQ3hCLE1BQU0sR0FBRyxHQUFHLEtBQXVCLENBQUE7c0JBQ25DLElBQUksR0FBRyxDQUFDLE1BQU0sQ0FBQyxJQUFJLElBQUksQ0FBQyxFQUFFOzBCQUN0QixNQUFNLFlBQVksR0FBc0IsRUFBRSxDQUFBO0VBQzFDLHdCQUFBLEtBQUssTUFBTSxNQUFNLElBQUksR0FBRyxDQUFDLE1BQU0sRUFBRTtFQUM3Qiw0QkFBQSxZQUFZLENBQUMsSUFBSSxDQUFDLG1CQUFtQixDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRSxTQUFTLENBQUMsQ0FBQyxDQUFBOzJCQUMvRDtFQUNELHdCQUFBLElBQUksWUFBWSxDQUFDLENBQUMsQ0FBQyxLQUFLLElBQUk7RUFBRSw0QkFBQSxPQUFPLFlBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQTtFQUMvQyw2QkFBQSxJQUFJLFlBQVksQ0FBQyxDQUFDLENBQUMsS0FBSyxJQUFJO0VBQUUsNEJBQUEsT0FBTyxZQUFZLENBQUMsQ0FBQyxDQUFDLENBQUE7O0VBQ3BELDRCQUFBLE1BQU0sSUFBSSxZQUFZLENBQUE7dUJBQzlCOzJCQUFNLElBQUksR0FBRyxDQUFDLE1BQU0sQ0FBQyxJQUFJLElBQUksQ0FBQyxFQUFFO0VBQzdCLHdCQUFBLEtBQUssTUFBTSxNQUFNLElBQUksR0FBRyxDQUFDLE1BQU07OEJBQUUsT0FBTyxtQkFBbUIsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsU0FBUyxDQUFDLENBQUE7RUFDakYsd0JBQUEsTUFBTSxHQUFHLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQyxFQUFFLE1BQU0sQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUE7dUJBQ2xEOzJCQUFNLElBQUksR0FBRyxDQUFDLE1BQU0sQ0FBQyxJQUFJLEdBQUcsQ0FBQyxFQUFFOzswQkFFNUIsS0FBSyxNQUFNLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQyxJQUFJLEdBQUcsQ0FBQyxNQUFNLEVBQUU7OEJBQ2pDLE1BQU0sU0FBUyxHQUFHLElBQUksR0FBRyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQTtFQUNyQyw0QkFBQSxNQUFNLFNBQVMsR0FBRyxJQUFJLEdBQUcsRUFBRSxDQUFBO0VBQzNCLDRCQUFBLFNBQVMsQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFBO0VBQ3ZCLDRCQUFBLFNBQVMsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUE7RUFDckIsNEJBQUEsSUFBSSxFQUFFLENBQUE7OEJBQ04sU0FBUyxDQUFDLEdBQUcsRUFBRSxFQUFFLEdBQUcsRUFBRSxDQUFDLEdBQUcsR0FBRztrQ0FDekIsSUFBSSxFQUFFLEdBQUcsQ0FBQyxJQUFJO2tDQUNkLFNBQVMsRUFBRSxHQUFHLENBQUMsU0FBUztFQUN4QixnQ0FBQSxNQUFNLEVBQUUsU0FBUztrQ0FDakIsVUFBVSxFQUFFLEdBQUcsQ0FBQyxVQUFVO0VBQzFCLGdDQUFBLEVBQUUsRUFBRSxFQUFFO0VBQ1QsNkJBQUEsQ0FBQyxDQUFBO0VBQ0YsNEJBQUEsT0FBTyxtQkFBbUIsQ0FDdEI7a0NBQ0ksSUFBSSxFQUFFLEdBQUcsQ0FBQyxJQUFJO2tDQUNkLFNBQVMsRUFBRSxHQUFHLENBQUMsU0FBUztFQUN4QixnQ0FBQSxNQUFNLEVBQUUsU0FBUztrQ0FDakIsVUFBVSxFQUFFLEdBQUcsQ0FBQyxVQUFVO2tDQUMxQixFQUFFLEVBQUUsRUFBRSxDQUFDLEdBQUc7K0JBQ2IsRUFDRCxTQUFTLENBQ1osQ0FBQTsyQkFDSjt1QkFDSjs7RUFBTSx3QkFBQSxPQUFPLElBQUksQ0FBQTttQkFDckI7dUJBQU0sSUFBSSxHQUFHLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUU7RUFDeEIsb0JBQUEsTUFBTSxJQUFLLEtBQUssQ0FBQyxHQUFHLENBQWtCLENBQUMsQ0FBQyxDQUFBO21CQUMzQzs7c0JBQU0sS0FBSyxHQUFHLEtBQUssQ0FBQTtrQkFDcEIsTUFBSztFQUNULFlBQUE7a0JBQ0ksS0FBSyxHQUFHLEtBQUssQ0FBQTtXQUNwQjtFQUNELFFBQUEsSUFBSSxLQUFLO2NBQUUsTUFBTSxJQUFJLEdBQUcsQ0FBQTtPQUMzQjtFQUNELElBQUEsTUFBTSxHQUFHLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQyxFQUFFLE1BQU0sQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUE7RUFDL0MsSUFBQSxNQUFNLElBQUksSUFBSSxHQUFHLFNBQVMsQ0FBQyxLQUFLLENBQUE7RUFDaEMsSUFBQSxPQUFPLENBQUMsR0FBRyxDQUFDLGFBQWEsRUFBRSxNQUFNLENBQUMsQ0FBQTtFQUNsQyxJQUFBLE9BQU8sTUFBTSxDQUFBO0VBQ2pCLENBQUM7RUFDZSxTQUFBLGdCQUFnQixDQUFrQixLQUFBLEdBQWtCLE9BQVksRUFBQTtNQUM1RSxNQUFNLFFBQVEsR0FBRyxtQkFBbUIsQ0FBQyxLQUFLLEVBQUUsZ0JBQWdCLENBQUMsQ0FBQTtFQUM3RCxJQUFBLElBQUksQ0FBQyxRQUFRO0VBQUUsUUFBQSxPQUFPLElBQUksQ0FBQTtNQUMxQixNQUFNLFFBQVEsR0FBRyxRQUFRLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBQyxDQUFBO0VBQ2pELElBQUEsSUFBSSxRQUFRO0VBQUUsUUFBQSxRQUFRLENBQUMsU0FBUyxHQUFHLFFBQVEsQ0FBQTtFQUMzQyxJQUFBLE9BQU8sUUFBUSxDQUFBO0VBQ25CLENBQUM7V0FDZSxVQUFVLEdBQUE7RUFDdEIsSUFBQSxpQkFBaUIsQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLENBQUE7RUFDcEMsQ0FBQztXQUVlLFNBQVMsR0FBQTs7RUFFckIsSUFBQSxNQUFNLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLEVBQUUsUUFBUSxDQUFDLENBQUMsQ0FBQTtFQUN0RSxJQUFBLE1BQU0sQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsRUFBRSxRQUFRLENBQUMsQ0FBQyxDQUFBO0VBQ3hFOztFQzlYTyxJQUFJLEVBQTBCLENBQUE7RUFFckMsSUFBSSxXQUF3QixDQUFBO0VBQzVCLElBQUksT0FBZ0IsQ0FBQTtFQWNwQixTQUFTLFVBQVUsQ0FBQyxJQUFZLEVBQUUsTUFBYyxFQUFBO01BQzVDLE1BQU0sTUFBTSxHQUFHLEVBQUUsQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLENBQUE7RUFDcEMsSUFBQSxJQUFJLENBQUMsTUFBTTtFQUFFLFFBQUEsT0FBTyxJQUFJLENBQUE7RUFDeEIsSUFBQSxFQUFFLENBQUMsWUFBWSxDQUFDLE1BQU0sRUFBRSxNQUFNLENBQUMsQ0FBQTtFQUMvQixJQUFBLEVBQUUsQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLENBQUE7RUFDeEIsSUFBQSxJQUFJLENBQUMsRUFBRSxDQUFDLGtCQUFrQixDQUFDLE1BQU0sRUFBRSxFQUFFLENBQUMsY0FBYyxDQUFDLEVBQUU7VUFDbkQsS0FBSyxDQUFDLENBQTRDLHlDQUFBLEVBQUEsRUFBRSxDQUFDLGdCQUFnQixDQUFDLE1BQU0sQ0FBQyxDQUFFLENBQUEsQ0FBQyxDQUFBO0VBQ2hGLFFBQUEsRUFBRSxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUMsQ0FBQTtFQUN2QixRQUFBLE9BQU8sSUFBSSxDQUFBO09BQ2Q7RUFDRCxJQUFBLE9BQU8sTUFBTSxDQUFBO0VBQ2pCLENBQUM7RUFFRCxTQUFTLGlCQUFpQixDQUFDLFFBQWdCLEVBQUUsUUFBZ0IsRUFBQTtNQUN6RCxNQUFNLFlBQVksR0FBRyxVQUFVLENBQUMsRUFBRSxDQUFDLGFBQWEsRUFBRSxRQUFRLENBQUMsQ0FBQTtFQUMzRCxJQUFBLElBQUksQ0FBQyxZQUFZO0VBQUUsUUFBQSxPQUFPLElBQUksQ0FBQTtNQUM5QixNQUFNLGNBQWMsR0FBRyxVQUFVLENBQUMsRUFBRSxDQUFDLGVBQWUsRUFBRSxRQUFRLENBQUMsQ0FBQTtFQUMvRCxJQUFBLElBQUksQ0FBQyxjQUFjO0VBQUUsUUFBQSxPQUFPLElBQUksQ0FBQTtFQUVoQyxJQUFBLE1BQU0sYUFBYSxHQUFHLEVBQUUsQ0FBQyxhQUFhLEVBQUUsQ0FBQTtFQUN4QyxJQUFBLElBQUksQ0FBQyxhQUFhO0VBQUUsUUFBQSxPQUFPLElBQUksQ0FBQTtFQUMvQixJQUFBLEVBQUUsQ0FBQyxZQUFZLENBQUMsYUFBYSxFQUFFLFlBQVksQ0FBQyxDQUFBO0VBQzVDLElBQUEsRUFBRSxDQUFDLFlBQVksQ0FBQyxhQUFhLEVBQUUsY0FBYyxDQUFDLENBQUE7RUFDOUMsSUFBQSxFQUFFLENBQUMsV0FBVyxDQUFDLGFBQWEsQ0FBQyxDQUFBO0VBRTdCLElBQUEsSUFBSSxDQUFDLEVBQUUsQ0FBQyxtQkFBbUIsQ0FBQyxhQUFhLEVBQUUsRUFBRSxDQUFDLFdBQVcsQ0FBQyxFQUFFO1VBQ3hELEtBQUssQ0FBQyxDQUE0Qyx5Q0FBQSxFQUFBLEVBQUUsQ0FBQyxpQkFBaUIsQ0FBQyxhQUFhLENBQUMsQ0FBRSxDQUFBLENBQUMsQ0FBQTtFQUN4RixRQUFBLE9BQU8sSUFBSSxDQUFBO09BQ2Q7RUFFRCxJQUFBLE9BQU8sYUFBYSxDQUFBO0VBQ3hCLENBQUM7RUFFRCxTQUFTLGtCQUFrQixHQUFBO0VBQ3ZCLElBQUEsTUFBTSxjQUFjLEdBQUcsRUFBRSxDQUFDLFlBQVksRUFBRSxDQUFBO01BQ3hDLEVBQUUsQ0FBQyxVQUFVLENBQUMsRUFBRSxDQUFDLFlBQVksRUFBRSxjQUFjLENBQUMsQ0FBQTtNQUM5QyxNQUFNLFNBQVMsR0FBRyxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxDQUFDLEdBQUcsRUFBRSxDQUFDLEdBQUcsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFBO0VBQzlELElBQUEsRUFBRSxDQUFDLFVBQVUsQ0FBQyxFQUFFLENBQUMsWUFBWSxFQUFFLElBQUksWUFBWSxDQUFDLFNBQVMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxXQUFXLENBQUMsQ0FBQTs7RUFFM0UsSUFBQSxPQUFPLGNBQWMsQ0FBQTtFQUN6QixDQUFDO0VBRUQsU0FBUyxnQkFBZ0IsR0FBQTtFQUNyQixJQUFBLE1BQU0sYUFBYSxHQUFHLEVBQUUsQ0FBQyxZQUFZLEVBQUUsQ0FBQTtNQUN2QyxNQUFNLElBQUksR0FBRyxJQUFJLFlBQVksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFLEVBQUUsR0FBRyxDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQUUsRUFBRSxHQUFHLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxFQUFFLEdBQUcsQ0FBQyxFQUFFLENBQUMsSUFBSSxFQUFFLEVBQUUsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFBO0VBQzlILElBQUEsTUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQTtNQUM1QixFQUFFLENBQUMsVUFBVSxDQUFDLEVBQUUsQ0FBQyxjQUFjLEVBQUUsYUFBYSxDQUFDLENBQUE7RUFDL0MsSUFBQSxFQUFFLENBQUMsVUFBVSxDQUFDLEVBQUUsQ0FBQyxjQUFjLEVBQUUsSUFBSSxFQUFFLEVBQUUsQ0FBQyxXQUFXLENBQUMsQ0FBQTtFQUN0RCxJQUFBLEVBQUUsQ0FBQyxlQUFlLENBQUMsRUFBRSxDQUFDLGNBQWMsRUFBRSxDQUFDLEVBQUUsYUFBYSxFQUFFLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQTtNQUVoRSxFQUFFLENBQUMsbUJBQW1CLENBQUMsV0FBVyxDQUFDLE9BQU8sRUFBRSxFQUFFLENBQUMsb0JBQW9CLENBQUMsV0FBVyxDQUFDLE9BQU8sRUFBRSxhQUFhLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQTtNQUUzRyxFQUFFLENBQUMsVUFBVSxDQUFDLEVBQUUsQ0FBQyxjQUFjLEVBQUUsYUFBYSxDQUFDLENBQUE7TUFDL0MsRUFBRSxDQUFDLGFBQWEsQ0FBQyxFQUFFLENBQUMsY0FBYyxFQUFFLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQTtNQUM1QyxFQUFFLENBQUMsVUFBVSxDQUFDLEVBQUUsQ0FBQyxjQUFjLEVBQUUsSUFBSSxDQUFDLENBQUE7RUFFdEMsSUFBQSxPQUFPLGFBQWEsQ0FBQTtFQUN4QixDQUFDO0VBTUQsU0FBUyxXQUFXLEdBQUE7TUFDaEIsT0FBTztVQUNILFFBQVEsRUFBRSxrQkFBa0IsRUFBRTtVQUM5QixNQUFNLEVBQUUsZ0JBQWdCLEVBQUU7T0FDN0IsQ0FBQTtFQUNMLENBQUM7RUFFRDtFQUNBO0VBQ0EsU0FBUyxvQkFBb0IsQ0FBQyxPQUFnQixFQUFFLFdBQXdCLEVBQUE7RUFDcEUsSUFBQSxNQUFNLGFBQWEsR0FBRyxDQUFDLENBQUE7RUFDdkIsSUFBQSxNQUFNLElBQUksR0FBRyxFQUFFLENBQUMsS0FBSyxDQUFBO0VBQ3JCLElBQUEsTUFBTSxTQUFTLEdBQUcsS0FBSyxDQUFBO0VBQ3ZCLElBQUEsTUFBTSxNQUFNLEdBQUcsQ0FBQyxDQUFBO0VBQ2hCLElBQUEsTUFBTSxNQUFNLEdBQUcsQ0FBQyxDQUFBO01BQ2hCLEVBQUUsQ0FBQyxVQUFVLENBQUMsRUFBRSxDQUFDLFlBQVksRUFBRSxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUE7RUFDaEQsSUFBQSxFQUFFLENBQUMsbUJBQW1CLENBQUMsV0FBVyxDQUFDLGVBQWUsQ0FBQyxjQUFjLEVBQUUsYUFBYSxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsTUFBTSxFQUFFLE1BQU0sQ0FBQyxDQUFBO01BQ2xILEVBQUUsQ0FBQyx1QkFBdUIsQ0FBQyxXQUFXLENBQUMsZUFBZSxDQUFDLGNBQWMsQ0FBQyxDQUFBO0VBQzFFLENBQUM7RUFDTSxlQUFlLGFBQWEsQ0FBQyxRQUFBLEdBQW1CLGdCQUFnQixFQUFZLEVBQUE7RUFDL0UsSUFBQSxNQUFNLFVBQVUsR0FBRyxNQUFNLEtBQUssQ0FBQyxxQkFBcUIsQ0FBQyxDQUFBO0VBQ3JELElBQUEsTUFBTSxNQUFNLEdBQUcsTUFBTSxVQUFVLENBQUMsSUFBSSxFQUFFLENBQUE7RUFDdEMsSUFBQSxPQUFPLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFBO0VBQ25CLElBQUEsTUFBTSxVQUFVLEdBQUcsTUFBTSxLQUFLLENBQUMsdUJBQXVCLENBQUMsQ0FBQTtFQUN2RCxJQUFBLElBQUksTUFBTSxHQUFHLE1BQU0sVUFBVSxDQUFDLElBQUksRUFBRSxDQUFBO0VBRXBDLElBQUEsSUFBSSxDQUFDLFFBQVE7RUFBRSxRQUFBLFFBQVEsR0FBRyxJQUFJLENBQUE7O01BRzlCLE1BQU0sR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFDLFdBQVcsRUFBRSxRQUFRLENBQUMsQ0FBQTtFQUU5QyxJQUFBLE9BQU8sQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUE7TUFDbkIsTUFBTSxhQUFhLEdBQUcsaUJBQWlCLENBQUMsTUFBTSxFQUFFLE1BQU0sQ0FBQyxDQUFBO0VBQ3ZELElBQUEsSUFBSSxDQUFDLGFBQWE7VUFBRSxPQUFNO0VBRTFCLElBQUEsV0FBVyxHQUFHO0VBQ1YsUUFBQSxPQUFPLEVBQUUsYUFBYTtFQUN0QixRQUFBLGVBQWUsRUFBRTtjQUNiLGNBQWMsRUFBRSxFQUFFLENBQUMsaUJBQWlCLENBQUMsYUFBYSxFQUFFLFFBQVEsQ0FBQztFQUNoRSxTQUFBO0VBQ0QsUUFBQSxnQkFBZ0IsRUFBRTtjQUNkLE1BQU0sRUFBRSxFQUFFLENBQUMsa0JBQWtCLENBQUMsYUFBYSxFQUFFLFFBQVEsQ0FBQztjQUN0RCxNQUFNLEVBQUUsRUFBRSxDQUFDLGtCQUFrQixDQUFDLGFBQWEsRUFBRSxRQUFRLENBQUM7Y0FDdEQsSUFBSSxFQUFFLEVBQUUsQ0FBQyxrQkFBa0IsQ0FBQyxhQUFhLEVBQUUsTUFBTSxDQUFDO0VBQ3JELFNBQUE7T0FDSixDQUFBO01BQ0QsT0FBTyxHQUFHLFdBQVcsRUFBRSxDQUFBO0VBQzNCLENBQUM7RUFDTSxlQUFlLElBQUksR0FBQTtNQUN0QixNQUFNLE1BQU0sR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLFdBQVcsQ0FBc0IsQ0FBQTtFQUN2RSxJQUFBLElBQUksQ0FBQyxNQUFNO1VBQUUsT0FBTTtFQUVuQixJQUFBLEVBQUUsR0FBRyxNQUFNLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBMkIsQ0FBQTs7RUFHMUQsSUFBQSxJQUFJLEVBQUUsS0FBSyxJQUFJLEVBQUU7VUFDYixLQUFLLENBQUMseUVBQXlFLENBQUMsQ0FBQTtVQUNoRixPQUFNO09BQ1Q7TUFDRCxNQUFNLGFBQWEsRUFBRSxDQUFBO0VBQ3pCLENBQUM7V0FDZSxNQUFNLEdBQUE7TUFDbEIsRUFBRSxDQUFDLFVBQVUsQ0FBQyxHQUFHLEVBQUUsSUFBSSxFQUFFLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQTtFQUNsQyxJQUFBLEVBQUUsQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLENBQUE7TUFFbEIsRUFBRSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsVUFBVSxDQUFDLENBQUE7TUFDeEIsRUFBRSxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLENBQUE7TUFDdkIsRUFBRSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsZ0JBQWdCLEdBQUcsRUFBRSxDQUFDLGdCQUFnQixDQUFDLENBQUE7RUFDbkQsSUFBQSxvQkFBb0IsQ0FBQyxPQUFPLEVBQUUsV0FBVyxDQUFDLENBQUE7RUFFMUMsSUFBQSxFQUFFLENBQUMsVUFBVSxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsQ0FBQTtNQUVsQyxFQUFFLENBQUMsVUFBVSxDQUFDLEVBQUUsQ0FBQyxjQUFjLEVBQUUsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFBO01BQ2hELEVBQUUsQ0FBQyxhQUFhLENBQUMsRUFBRSxDQUFDLGNBQWMsRUFBRSxDQUFDLEVBQUUsSUFBSSxZQUFZLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLElBQUksRUFBRSxFQUFFLEdBQUcsQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFLEVBQUUsR0FBRyxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsRUFBRSxHQUFHLENBQUMsRUFBRSxDQUFDLElBQUksRUFBRSxFQUFFLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFBO0VBRXpKLElBQUEsRUFBRSxDQUFDLFNBQVMsQ0FBQyxXQUFXLENBQUMsZ0JBQWdCLENBQUMsTUFBTSxFQUFFLE1BQU0sQ0FBQyxVQUFVLENBQUMsQ0FBQTtFQUNwRSxJQUFBLEVBQUUsQ0FBQyxTQUFTLENBQUMsV0FBVyxDQUFDLGdCQUFnQixDQUFDLE1BQU0sRUFBRSxNQUFNLENBQUMsV0FBVyxDQUFDLENBQUE7RUFDckUsSUFBQSxFQUFFLENBQUMsU0FBUyxDQUFDLFdBQVcsQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUE7TUFFM0QsRUFBRSxDQUFDLFVBQVUsQ0FBQyxFQUFFLENBQUMsY0FBYyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQTtFQUV0QyxJQUFBLGFBQWEsRUFBRSxDQUFBOzs7RUFJZixJQUFBLE1BQU0sQ0FBQyxxQkFBcUIsQ0FBQyxNQUFNLENBQUMsQ0FBQTtFQUN4Qzs7QUNwS1dBLDJCQUFpQixHQUFZLE1BQUs7RUFFN0MsTUFBTSxZQUFZLEdBQUcsS0FBSyxFQUFnQixDQUFBO0VBQzFDLE1BQU0sV0FBVyxHQUFHLEtBQUssRUFBZ0IsQ0FBQTtFQUVuQyxTQUFVLFNBQVMsQ0FBQyxLQUFtQixFQUFBO0VBQ3pDLElBQUEsWUFBWSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQTtFQUN4QixJQUFBLFdBQVcsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFBO0VBQ3RCLElBQUEsYUFBYSxFQUFFLENBQUE7RUFDbkIsQ0FBQztFQUNELFNBQVMsYUFBYSxHQUFBO01BQ2xCLE1BQU0sVUFBVSxHQUFHLFFBQVEsQ0FBQyxjQUFjLENBQUMsU0FBUyxDQUFDLENBQUE7TUFDckQsSUFBSSxDQUFDLFVBQVUsRUFBRTtVQUNiLEtBQUssQ0FBQyw4QkFBOEIsQ0FBQyxDQUFBO1VBQ3JDLE9BQU07T0FDVDtFQUNELElBQUEsVUFBVSxDQUFDLFNBQVMsR0FBRyxFQUFFLENBQUE7RUFDekIsSUFBQSxNQUFNLFNBQVMsR0FBRyxZQUFZLENBQUMsTUFBTSxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsV0FBVyxDQUFDLENBQUE7TUFDMUQsSUFBSSxLQUFLLEdBQUcsU0FBUyxDQUFBO0VBQ3JCLElBQUEsS0FBSyxNQUFNLEtBQUssSUFBSSxTQUFTLEVBQUU7VUFDM0IsTUFBTSxRQUFRLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQTtFQUM5QyxRQUFBLElBQUksS0FBSyxJQUFJLElBQUksRUFBRTtFQUNmLFlBQUEsUUFBUSxDQUFDLFNBQVMsR0FBRyxpQkFBaUIsQ0FBQTtFQUN0QyxZQUFBLFFBQVEsQ0FBQyxTQUFTLEdBQUcsR0FBRyxDQUFBO2NBQ3hCLEtBQUssR0FBRyxNQUFNLENBQUE7V0FDakI7ZUFBTTtFQUNILFlBQUEsUUFBUSxDQUFDLFNBQVMsR0FBRyxLQUFLLEdBQUcsUUFBUSxDQUFBO0VBQ3JDLFlBQUEsUUFBUSxDQUFDLFNBQVMsR0FBRyxLQUFLLENBQUMsSUFBSSxHQUFHLEdBQUcsR0FBRyxLQUFLLENBQUMsS0FBSyxDQUFDLElBQUksR0FBRyxLQUFLLENBQUMsS0FBSyxDQUFDLEVBQUUsR0FBRyxNQUFNLEdBQUcsS0FBSyxDQUFDLE1BQU0sQ0FBQyxJQUFJLEdBQUcsS0FBSyxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUE7V0FDM0g7RUFDRCxRQUFBLFVBQVUsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUE7T0FDOUI7RUFDTCxDQUFDO0VBRUQsU0FBUyxJQUFJLEdBQUE7RUFDVCxJQUFBLE1BQU0sU0FBUyxHQUFHLFlBQVksQ0FBQyxHQUFHLEVBQUUsQ0FBQTtNQUNwQyxJQUFJLENBQUMsU0FBUyxFQUFFO1VBQ1osS0FBSyxDQUFDLGdCQUFnQixDQUFDLENBQUE7VUFDdkIsT0FBTTtPQUNUO0VBQ0QsSUFBQSxRQUFRLFNBQVMsQ0FBQyxJQUFJO0VBQ2xCLFFBQUEsS0FBSyxRQUFRO2NBQ1QsUUFBUSxDQUFDLFNBQVMsQ0FBQyxLQUFLLEVBQUUsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFBO0VBQzNDLFlBQUEsYUFBYSxFQUFFLENBQUE7Y0FDZixNQUFLO0VBQ1QsUUFBQSxLQUFLLEtBQUs7Y0FDTixXQUFXLENBQUMsU0FBUyxDQUFDLEtBQUssRUFBRSxTQUFTLENBQUMsTUFBTSxDQUFDLENBQUE7RUFDOUMsWUFBQSxhQUFhLEVBQUUsQ0FBQTtjQUNmLE1BQUs7T0FDWjtFQUNELElBQUEsV0FBVyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQTtFQUMzQixJQUFBLGFBQWEsRUFBRSxDQUFBO0VBQ25CLENBQUM7RUFFRCxTQUFTLElBQUksR0FBQTtFQUNULElBQUEsTUFBTSxTQUFTLEdBQUcsV0FBVyxDQUFDLEdBQUcsRUFBRSxDQUFBO01BQ25DLElBQUksQ0FBQyxTQUFTLEVBQUU7VUFDWixLQUFLLENBQUMscUJBQXFCLENBQUMsQ0FBQTtVQUM1QixPQUFNO09BQ1Q7RUFDRCxJQUFBLFFBQVEsU0FBUyxDQUFDLElBQUk7RUFDbEIsUUFBQSxLQUFLLFFBQVE7Y0FDVCxXQUFXLENBQUMsU0FBUyxDQUFDLEtBQUssRUFBRSxTQUFTLENBQUMsTUFBTSxDQUFDLENBQUE7RUFDOUMsWUFBQSxhQUFhLEVBQUUsQ0FBQTtjQUNmLE1BQUs7RUFDVCxRQUFBLEtBQUssS0FBSztjQUNOLFFBQVEsQ0FBQyxTQUFTLENBQUMsS0FBSyxFQUFFLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQTtFQUMzQyxZQUFBLGFBQWEsRUFBRSxDQUFBO2NBQ2YsTUFBSztPQUNaO0VBQ0QsSUFBQSxZQUFZLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFBO0VBQzVCLElBQUEsYUFBYSxFQUFFLENBQUE7RUFDbkIsQ0FBQztFQUNNLGVBQWUsSUFBSSxHQUFBO01BQ3RCLE1BQU0sTUFBTSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsV0FBVyxDQUFzQixDQUFBO0VBQ3ZFLElBQUEsTUFBTSxDQUFDLGdCQUFnQixDQUFDLFlBQVksRUFBRSxNQUFLO1VBQ3ZDQSx5QkFBaUIsR0FBRyxLQUFLLENBQUE7RUFDN0IsS0FBQyxDQUFDLENBQUE7RUFDRixJQUFBLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxXQUFXLEVBQUUsTUFBSztVQUN0Q0EseUJBQWlCLEdBQUcsSUFBSSxDQUFBO0VBQzVCLEtBQUMsQ0FBQyxDQUFBO01BRUYsTUFBTSxJQUFJLEVBQUUsQ0FBQTtFQUNaLElBQUEsVUFBVSxFQUFFLENBQUE7RUFFWixJQUFBLE1BQU0sRUFBRSxDQUFBO0VBQ1osQ0FBQztFQVVELE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLENBQUE7RUFDckM7RUFFQSxNQUFNLENBQUMsY0FBYyxHQUFHLFNBQVMsQ0FBQTtFQUNqQyxNQUFNLENBQUMsV0FBVyxHQUFHQyxlQUF3QixDQUFBO0VBQzdDLE1BQU0sQ0FBQyxXQUFXLEdBQUdDLGVBQXdCLENBQUE7RUFDN0MsTUFBTSxDQUFDLFNBQVMsR0FBR0MsYUFBc0IsQ0FBQTtFQUN6QyxNQUFNLENBQUMsUUFBUSxHQUFHLE1BQUs7RUFDbkIsSUFBQSxJQUFJSCx5QkFBaUI7RUFBRSxRQUFBLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFBO0VBQzlDLENBQUMsQ0FBQTtFQUNELE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxhQUFhLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLGNBQWMsRUFBRSxDQUFDLENBQUE7RUFDakUsTUFBTSxDQUFDLGdCQUFnQixDQUFDLE9BQU8sRUFBRUksZUFBd0IsQ0FBQyxDQUFBO0VBQzFELE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUVDLFdBQW9CLENBQUMsQ0FBQTtFQUN0RCxNQUFNLENBQUMsZ0JBQWdCLENBQUMsU0FBUyxFQUFFQyxhQUFzQixDQUFDLENBQUE7RUFFMUQsU0FBUyxRQUFRLENBQUMsQ0FBZ0IsRUFBQTtFQUM5QixJQUFBLElBQUksQ0FBQyxDQUFDLE9BQU8sSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDLE9BQU8sSUFBSSxDQUFDLENBQUMsUUFBUTtFQUFFLFFBQUEsSUFBSSxFQUFFLENBQUE7V0FDakQsSUFBSSxDQUFDLENBQUMsT0FBTyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUMsT0FBTztFQUFFLFFBQUEsSUFBSSxFQUFFLENBQUE7V0FDeEMsSUFBSSxDQUFDLENBQUMsR0FBRyxJQUFJLEdBQUcsSUFBSSxDQUFDLENBQUMsT0FBTztFQUFFLFFBQUFDLEdBQVksQ0FBQyxNQUFNLEVBQUUsQ0FBQTs7RUFFN0QsQ0FBQztFQUVELFFBQVEsQ0FBQyxTQUFTLEdBQUcsUUFBUSxDQUFBO0VBRTdCLE1BQU0sSUFBSSxHQUFHLFFBQVEsQ0FBQyxjQUFjLENBQUMsVUFBVSxDQUFDLEVBQUUsVUFBVSxDQUFBO0VBQzVELElBQUksSUFBSSxJQUFJLFNBQVMsRUFBRTtFQUNuQixJQUFBLEtBQUssTUFBTSxHQUFHLElBQUksSUFBSSxFQUFFO0VBQ3BCLFFBQUEsSUFBSSxHQUFxQjtFQUNwQixZQUFBLEdBQXNCLENBQUMsT0FBTyxHQUFHLE1BQUs7a0JBQ25DLFNBQVMsQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFFLEdBQXNCLENBQUMsU0FBUyxDQUFDLENBQUE7RUFDcEUsYUFBQyxDQUFBO09BQ1I7RUFDTDs7Ozs7Ozs7Ozs7In0=
