class ShapeManager {
    constructor() {
        this.canvas = document.getElementById('canvas');
        this.shapeCountInput = document.getElementById('shapeCount');
        this.shapeButtons = document.querySelectorAll('.shape-btn');
        this.currentShape = null;

        this.minSize = 40;
        this.maxSize = 150;
        this.triangleFixedSize = Math.floor((this.minSize + this.maxSize) / 2);

        this.init();
    }

    init() {
        this.setupEventListeners();
    }

    setupEventListeners() {
        this.shapeButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const shapeType = e.currentTarget.dataset.shape;
                this.setCurrentShape(shapeType);
                this.generateShapes();
            });
        });

        this.canvas.addEventListener('dblclick', (e) => {
            const shapeEl = e.target.closest('.shape');
            if (shapeEl) shapeEl.remove();
        });

        this.canvas.addEventListener('click', (e) => {
            const shapeEl = e.target.closest('.shape');
            if (shapeEl) this.selectShape(shapeEl);
        });
    }

    setCurrentShape(shape) {
        this.currentShape = shape;
        this.shapeButtons.forEach(btn => {
            btn.classList.toggle('active', btn.dataset.shape === shape);
        });
    }

    generateShapes() {
        if (!this.currentShape) return;

        const count = parseInt(this.shapeCountInput.value) || 1;

        for (let i = 0; i < count; i++) {
            this.addShape();
        }
    }

    addShape() {
        const size = this.currentShape === 'triangle'
            ? this.triangleFixedSize
            : Math.floor(Math.random() * (this.maxSize - this.minSize + 1)) + this.minSize;

        const x = Math.random() * (this.canvas.offsetWidth - size);
        const y = Math.random() * (this.canvas.offsetHeight - size);

        if (this.currentShape === 'triangle') {
            const svgNS = "http://www.w3.org/2000/svg";
            const wrapper = document.createElement('div');
            wrapper.className = 'shape triangle';
            wrapper.style.left = `${x}px`;
            wrapper.style.top = `${y}px`;
            wrapper.style.position = 'absolute';

            const svg = document.createElementNS(svgNS, "svg");

            const triangleWidth = size * 1.5;
            const triangleHeight = size * 0.8;

            svg.setAttribute("width", triangleWidth);
            svg.setAttribute("height", triangleHeight);
            svg.setAttribute("viewBox", `0 0 ${triangleWidth} ${triangleHeight}`);

            const polygon = document.createElementNS(svgNS, "polygon");

            const topX = triangleWidth / 2;
            const topY = 5;
            const leftX = 5;
            const leftY = triangleHeight - 5;
            const rightX = triangleWidth - 5;
            const rightY = triangleHeight - 5;

            polygon.setAttribute("points", `${topX},${topY} ${leftX},${leftY} ${rightX},${rightY}`);
            polygon.setAttribute("fill", "rgb(26, 26, 255)");
            polygon.setAttribute("stroke", "none");

            svg.appendChild(polygon);
            wrapper.appendChild(svg);
            this.canvas.appendChild(wrapper);
        } else {
            const shape = document.createElement('div');
            shape.className = `shape ${this.currentShape}`;
            shape.style.left = `${x}px`;
            shape.style.top = `${y}px`;
            shape.style.width = `${size}px`;
            shape.style.height = `${size}px`;
            this.canvas.appendChild(shape);
        }
    }

    selectShape(shape) {
        document.querySelectorAll('.shape.selected').forEach(s => {
            s.classList.remove('selected');

            if (s.classList.contains('square')) {
                s.style.backgroundColor = 'rgb(255, 26, 26)';
            } else if (s.classList.contains('circle')) {
                s.style.backgroundColor = 'rgb(26, 141, 26)';
            } else if (s.classList.contains('triangle')) {
                const poly = s.querySelector('polygon');
                if (poly) poly.setAttribute('fill', 'rgb(26, 26, 255)');
            }
        });

        shape.classList.add('selected');

        if (shape.classList.contains('square')) {
            shape.style.backgroundColor = 'rgb(255, 255, 26)';
        } else if (shape.classList.contains('circle')) {
            shape.style.backgroundColor = 'rgb(255, 255, 26)';
        } else if (shape.classList.contains('triangle')) {
            const poly = shape.querySelector('polygon');
            if (poly) poly.setAttribute('fill', 'rgb(255, 255, 26)');
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new ShapeManager();
});