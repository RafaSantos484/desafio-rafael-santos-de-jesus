class CaixaDaLanchonete {
  // Dicionário que relaciona o código do produto ao seu preço
  cardapio = {
    cafe: 3,
    chantily: 1.5,
    suco: 6.2,
    sanduiche: 6.5,
    queijo: 2,
    salgado: 7.25,
    combo1: 9.5,
    combo2: 7.5,
  };
  // Vetor contendo os métodos de pagamento válidos
  metodosPagamento = ["dinheiro", "debito", "credito"];

  // Converte vetor de strings em dicionário relacionando codigo à quantidade de produtos
  // Exemplo: ['cafe,1', 'sanduiche,3'] => {cafe: 1, sanduiche:3}
  strToObj(strItens) {
    if (strItens.length === 0) throw "Não há itens no carrinho de compra!";

    const objItens = {};
    for (const strItem of strItens) {
      const [codigo, strQuantidade] = strItem.split(",");

      if (!codigo || !(codigo in this.cardapio)) throw "Item inválido!";

      let quantidade;
      try {
        quantidade = Number(strQuantidade);
      } catch {
        throw "Quantidade inválida!";
      }
      if (quantidade <= 0) throw "Quantidade inválida!";

      if (!objItens[codigo]) objItens[codigo] = 0;
      objItens[codigo] += quantidade;
    }

    if (
      (objItens.chantily && !objItens.cafe) ||
      (objItens.queijo && !objItens.sanduiche)
    )
      throw "Item extra não pode ser pedido sem o principal";

    return objItens;
  }

  calcularValorDaCompra(metodoDePagamento, itens) {
    if (!this.metodosPagamento.includes(metodoDePagamento))
      return "Forma de pagamento inválida!";

    let objItens;
    try {
      objItens = this.strToObj(itens);
    } catch (err) {
      return err;
    }

    let total = 0;
    for (const [codigo, quantidade] of Object.entries(objItens))
      total += quantidade * this.cardapio[codigo];

    if (metodoDePagamento === "dinheiro") total *= 0.95;
    else if (metodoDePagamento === "credito") total *= 1.03;

    return `R$ ${total.toFixed(2).toString().replace(".", ",")}`;
  }
}

export { CaixaDaLanchonete };
