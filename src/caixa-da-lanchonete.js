class CaixaDaLanchonete {
  calcularValorDaCompra(metodoDePagamento, itens) {
    let arrayItens = itens.toString();
    let valorFinal;
    let foraDoCardapio = 0;
    let qtdeInval = 0;
    let itensExtras = 0;
    let carrinhoVazio = 0;
    let formaPgtoInval = 0;
    let totalCarrinho = 0;

    //verifica se há itens no carrinho e se forma de pgto é válida
    function validacaoInicial() {
      if (!itens.length) {
        carrinhoVazio++; // Não há itens no carrinho de compra
      } else {
        if (
          metodoDePagamento === 'debito' ||
          metodoDePagamento === 'credito' ||
          metodoDePagamento === 'dinheiro'
        ) {
          valorDaCompra();
        } else {
          formaPgtoInval++; // Forma de pagamento inválida
        }
      }
    }
    validacaoInicial();

    function valorDaCompra() {
      let cardapio = [
        { codigo: 'cafe', descricao: 'Café', preco: 3.0 },
        {
          codigo: 'chantily',
          descricao: 'Chantily (extra do Café)',
          preco: 1.5,
        },
        { codigo: 'suco', descricao: 'Suco Natural', preco: 6.2 },
        { codigo: 'sanduiche', descricao: 'Sanduíche', preco: 6.5 },
        {
          codigo: 'queijo',
          descricao: 'Queijo (extra do Sanduíche)',
          preco: 2.0,
        },
        { codigo: 'salgado', descricao: 'Salgado', preco: 7.25 },
        { codigo: 'combo1', descricao: '1 Suco e 1 Sanduíche', preco: 9.5 },
        { codigo: 'combo2', descricao: '1 Café e 1 Sanduíche', preco: 7.5 },
      ];

      for (let i = 0; i < itens.length; i++) {
        let arrayProdComprado = itens[i].split(','); // transforma item em array de nome e qtde separados, ex ['cafe', '3']
        let prodComprado = arrayProdComprado[0]; // seleciona o primeiro item da array, ex string 'cafe'
        let qtdeComprada = +arrayProdComprado[1]; // seleciona o segundo item da array, ex 3
        let precoProduto;

        if (qtdeComprada === 0) {
          qtdeInval++; //Quantidade inválida!
        } else {
          //busca o produto no cardápio
          let produtos = cardapio.find((item) => item.codigo == prodComprado);

          //verifica se a array de itens comprados inclui item principal
          function buscaItem(itemPrincipal) {
            if (arrayItens.includes(itemPrincipal)) {
              precoProduto = produtos.preco;
              somarItens(precoProduto, qtdeComprada);
            } else {
              itensExtras++;
            }
          }

          if (produtos === undefined) {
            foraDoCardapio++; //Item inválido!
          } else {
            //verifica se o produto comprado é chantily
            if (produtos.codigo == 'chantily') {
              buscaItem('cafe');
            } else if (produtos.codigo == 'queijo') {
              buscaItem('sanduiche');
            } else {
              precoProduto = produtos.preco;
              somarItens(precoProduto, qtdeComprada);
            }
          }
        }
      }
    }

    //calcula o valor de cada produto e soma no totalCarrinho
    function somarItens(precoProduto, qtdeComprada) {
      let totalItem = precoProduto * qtdeComprada;
      totalCarrinho += totalItem;
    }

    //verifica forma de pagamento e calcula acréscimo/decréscimo
    function finalizarCompra() {
      switch (metodoDePagamento) {
        case 'debito':
          totalCarrinho = totalCarrinho;
          break;
        case 'credito':
          totalCarrinho += totalCarrinho * 0.03;
          break;
        case 'dinheiro':
          totalCarrinho -= totalCarrinho * 0.05;
          break;
      }
      valorFinal = `R$ ${totalCarrinho.toFixed(2).replace('.', ',')}`;
    }
    finalizarCompra();

    if (
      foraDoCardapio <= 0 &&
      qtdeInval <= 0 &&
      itensExtras <= 0 &&
      carrinhoVazio <= 0 &&
      formaPgtoInval <= 0
    ) {
      return valorFinal;
    } else if (foraDoCardapio > 0) {
      return 'Item inválido!';
    } else if (qtdeInval > 0) {
      return 'Quantidade inválida!';
    } else if (itensExtras > 0) {
      return 'Item extra não pode ser pedido sem o principal';
    } else if (carrinhoVazio > 0) {
      return 'Não há itens no carrinho de compra!';
    } else if (formaPgtoInval > 0) {
      return 'Forma de pagamento inválida!';
    }
  }
}

export { CaixaDaLanchonete };
