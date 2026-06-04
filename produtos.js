const produtosData = [
    {
        id: 1,
        nome: "Samsung Galaxy A36",
        marca: "Samsung",
        armazenamento: "256GB",
        ram: "8GB",
        condicao: "Novo",
        garantia: "1 Ano",
        estoque: "Em estoque",
        imagem: "./assets/Galaxy A36.webp",
        destaque: true
    },
    {
        id: 2,
        nome: "Samsung Galaxy A17",
        marca: "Samsung",
        armazenamento: "128GB",
        ram: "6GB",
        condicao: "Novo",
        garantia: "1 Ano",
        estoque: "Últimas unidades",
        imagem: "./assets/Galaxy A17.webp",
        destaque: true
    },
    {
        id: 3,
        nome: "Samsung Galaxy A07",
        marca: "Samsung",
        armazenamento: "128GB",
        ram: "4GB",
        condicao: "Novo",
        garantia: "1 Ano",
        estoque: "Em estoque",
        imagem: "./assets/Galaxy A07.webp",
        destaque: true
    },
    {
        id: 4,
        nome: "Realme C75",
        marca: "Realme",
        armazenamento: "256GB",
        ram: "8GB",
        condicao: "Novo",
        garantia: "1 Ano",
        estoque: "Em estoque",
        imagem: "./assets/Realme C75.webp",
        destaque: true
    },
    {
        id: 5,
        nome: "Moto G35 5G",
        marca: "Motorola",
        armazenamento: "128GB",
        ram: "6GB",
        condicao: "Novo",
        garantia: "1 Ano",
        estoque: "Em estoque",
        imagem: "./assets/Moto G35.webp",
        destaque: true
    },
    {
        id: 6,
        nome: "Moto G15 5G",
        marca: "Motorola",
        armazenamento: "128GB",
        ram: "4GB",
        condicao: "Novo",
        garantia: "1 Ano",
        estoque: "Em estoque",
        imagem: "./assets/Moto G15.webp",
        destaque: false
    },
    {
        id: 7,
        nome: "IPhone XR",
        marca: "Apple",
        armazenamento: "64GB",
        ram: "3GB",
        condicao: "Seminovo",
        garantia: "3 Meses",
        estoque: "Em estoque",
        imagem: "./assets/IPhone XR.webp",
        destaque: false
    },
    {
        id: 8,
        nome: "IPhone 13 Pro",
        marca: "Apple",
        armazenamento: "128GB",
        ram: "8GB",
        condicao: "Seminovo",
        garantia: "1 Ano",
        estoque: "Última unidade",
        imagem: "./assets/IPhone 13 Pro.webp",
        destaque: false
    },
    {
        id: 9,
        nome: "IPhone 13",
        marca: "Apple",
        armazenamento: "128GB",
        ram: "6GB",
        condicao: "Seminovo",
        garantia: "1 Ano",
        estoque: "Última unidade",
        imagem: "./assets/IPhone 13.webp",
        destaque: false
    },    
    {
        id: 10,
        nome: "IPhone 11 Pro Max",
        marca: "Apple",
        armazenamento: "256GB",
        ram: "6GB",
        condicao: "Seminovo",
        garantia: "1 Ano",
        estoque: "Em Estoque",
        imagem: "./assets/IPhone 11 Pro Max.webp",
        destaque: false
    },
    {
        id: 11,
        nome: "IPhone 11",
        marca: "Apple",
        armazenamento: "64GB",
        ram: "3GB",
        condicao: "Seminovo",
        garantia: "1 Ano",
        estoque: "Última unidade",
        imagem: "./assets/IPhone 11.webp",
        destaque: false
    },
    {
        id: 12,
        nome: "Realme Note 70",
        marca: "Realme",
        armazenamento: "256GB",
        ram: "8GB",
        condicao: "Novo",
        garantia: "1 Ano",
        estoque: "Em estoque",
        imagem: "./assets/Realme Note 70.webp",
        destaque: false
    }
];

// Helper functions that can be used globally
function getBadgeHtml(condicao, estoque) {
    let html = '';
    
    // Estoque Badge
    if (estoque === "Em estoque") {
        html += `<span class="badge badge-success">🟢 Em estoque</span>`;
    } else if (estoque === "Última unidade") {
        html += `<span class="badge badge-warning">🟡 Última unidade</span>`;
    }

    // Condicao Badge
    if (condicao === "Novo") {
        html += `<span class="badge badge-info">🔵 Novo</span>`;
    } else if (condicao === "Seminovo") {
        html += `<span class="badge badge-premium">⭐ Seminovo Premium</span>`;
    }

    return html;
}

function createProductCard(produto) {
    const whatsappMsg = encodeURIComponent(`Olá, tenho interesse no ${produto.nome}. Ele ainda está disponível?`);
    const whatsappLink = `https://wa.me/5511911932411?text=${whatsappMsg}`;

    return `
        <div class="product-card">
            <div class="product-badges">
                ${getBadgeHtml(produto.condicao, produto.estoque)}
            </div>
            <div class="product-image-wrapper">
                <img src="${produto.imagem}" alt="${produto.nome}" class="product-image" loading="lazy">
            </div>
            <div class="product-info">
                <h3 class="product-title">${produto.nome}</h3>
                <ul class="product-specs">
                    <li><i class="ph ph-hard-drives"></i> ${produto.armazenamento}</li>
                    <li><i class="ph ph-memory"></i> ${produto.ram} RAM</li>
                    <li><i class="ph ph-shield-check"></i> ${produto.garantia} de Garantia</li>
                </ul>
                <a href="${whatsappLink}" target="_blank" class="btn btn-primary w-100 product-btn">Consultar disponibilidade</a>
            </div>
        </div>
    `;
}
