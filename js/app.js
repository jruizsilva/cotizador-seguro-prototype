"use strict";
function Auto(marca, year, seguro) {
	this.marca = marca;
	this.year = year;
	this.seguro = seguro;
	this.precioBase = 2000;
}
function Europeo(marca, year, seguro) {
	Auto.call(this, marca, year, seguro);
}
Europeo.prototype = Object.create(Auto.prototype);
Europeo.prototype.constructor = Europeo;
Europeo.prototype.cotizar = function () {
	let precioSeguro = this.precioBase + this.precioBase * 0.35;
	const diferenciaYears = new Date().getFullYear() - this.year;
	const porcentajePorYear = (diferenciaYears * 3) / 100;
	precioSeguro -= precioSeguro * porcentajePorYear;
	if (this.seguro === "basico") {
		precioSeguro += precioSeguro * 0.3;
		return precioSeguro;
	}
	if (this.seguro === "completo") {
		precioSeguro += precioSeguro * 0.5;
		return precioSeguro;
	}
};
function Americano(marca, year, seguro) {
	Auto.call(this, marca, year, seguro);
}
Americano.prototype = Object.create(Auto.prototype);
Americano.prototype.constructor = Americano;
Americano.prototype.cotizar = function () {
	let precioSeguro = this.precioBase + this.precioBase * 0.15;
	const diferenciaYears = new Date().getFullYear() - this.year;
	const porcentajePorYear = (diferenciaYears * 3) / 100;
	precioSeguro -= precioSeguro * porcentajePorYear;
	if (this.seguro === "basico") {
		precioSeguro += precioSeguro * 0.3;
		return precioSeguro;
	}
	if (this.seguro === "completo") {
		precioSeguro += precioSeguro * 0.5;
		return precioSeguro;
	}
};
function Asiatico(marca, year, seguro) {
	Auto.call(this, marca, year, seguro);
}
Asiatico.prototype = Object.create(Auto.prototype);
Asiatico.prototype.constructor = Asiatico;
Asiatico.prototype.cotizar = function () {
	let precioSeguro = this.precioBase + this.precioBase * 0.05;
	const diferenciaYears = new Date().getFullYear() - this.year;
	const porcentajePorYear = (diferenciaYears * 3) / 100;
	precioSeguro -= precioSeguro * porcentajePorYear;
	if (this.seguro === "basico") {
		precioSeguro += precioSeguro * 0.3;
		return precioSeguro;
	}
	if (this.seguro === "completo") {
		precioSeguro += precioSeguro * 0.5;
		return precioSeguro;
	}
};

function UI() {}
UI.prototype.llenarYear = () => {
	const currentYear = new Date().getFullYear();
	const min = currentYear - 20;
	const fragment = document.createDocumentFragment();
	for (let i = currentYear; i >= min; i--) {
		const option = document.createElement("option");
		option.textContent = i;
		option.value = i;
		fragment.appendChild(option);
	}
	const selectYear = document.querySelector("#year");
	selectYear.appendChild(fragment);
};
UI.prototype.mostrarMsjError = () => {
	const main = document.querySelector("#main");
	const templateError = document.querySelector("#template-error").content;
	const clone = templateError.cloneNode(true);
	if (document.querySelectorAll(".error").length === 0) {
		main.appendChild(clone);
	}
};
UI.prototype.borrarMsjPrevios = () => {
	const main = document.querySelector("#main");
	if (main.querySelector(".error")) {
		main.querySelector(".error").remove();
	}
	if (main.querySelector("#secure")) {
		main.querySelector("#secure").remove();
	}
	if (main.querySelector("#cotizando")) {
		main.querySelector("#cotizando").remove();
	}
};
UI.prototype.mostrarResumen = (auto, total) => {
	const { marca, year, seguro } = auto;
	const main = document.querySelector("#main");
	const templateCotizando = document.querySelector(
		"#template-cotizando"
	).content;
	const cloneCotizando = templateCotizando.cloneNode(true);
	const templateResumen = document.querySelector("#template-secure").content;
	templateResumen.querySelector("#secure-marca").textContent = marca;
	templateResumen.querySelector("#secure-year").textContent = year;
	templateResumen.querySelector("#secure-tipo").textContent = seguro;
	templateResumen.querySelector("#secure-total").textContent = `$${total}`;
	const cloneResumen = templateResumen.cloneNode(true);
	ui.borrarMsjPrevios();
	main.appendChild(cloneCotizando);
	setTimeout(() => {
		main.querySelector("#cotizando").remove();
		main.appendChild(cloneResumen);
	}, 2000);
};
const ui = new UI();

const iniciarApp = () => {
	ui.llenarYear();
};
const validarCampos = (e) => {
	e.preventDefault();
	const marca = document.querySelector("#marca").value;
	const year = document.querySelector("#year").value;
	const seguro = document.querySelector(".radio:checked").value;
	if (seguro !== "" && marca !== "" && year !== "") {
		ui.borrarMsjPrevios();
		if (marca === "europeo") {
			const auto = new Europeo(marca, year, seguro);
			const total = auto.cotizar();
			ui.mostrarResumen(auto, total);
			return;
		}
		if (marca === "americano") {
			const auto = new Americano(marca, year, seguro);
			const total = auto.cotizar();
			ui.mostrarResumen(auto, total);
			return;
		}
		if (marca === "asiatico") {
			const auto = new Asiatico(marca, year, seguro);
			const total = auto.cotizar();
			ui.mostrarResumen(auto, total);
			return;
		}
	} else {
		ui.borrarMsjPrevios();
		ui.mostrarMsjError();
	}
};

const formulario = document.querySelector("#formulario");
const loadEventListenners = () => {
	formulario.addEventListener("submit", validarCampos);
	document.addEventListener("DOMContentLoaded", iniciarApp);
};
loadEventListenners();
