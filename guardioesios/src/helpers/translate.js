'use strict';
import React from 'react';
import { EventRegister } from 'react-native-event-listeners';
import { StorageManager } from '../storage/StorageManager.js';
import functions from './functions.js'
let _strings = {
    'pt':{
        'NovaObservacao':'Nova observação',
        'MeuPerfil':'Meu perfil',
        'Guardiao':'Guardião',
        'Especialista':'Especialista',
        'AlterarSenha':'Alterar senha',
        'CampoObrigatorio':'Campo obrigatório.',
        'Senha':'Senha',
        'ConfirmarSenha':'Confirmar senha',
        'Alterar':'Alterar',
        'SenhasDiferentes':'O campo Senha e Confirmar senha devem ser iguais.',
        'SenhaAlteradaSucesso' : 'Senha alterada com sucesso.',
        'ErroAlterarSenha' : 'Não foi possível alterar sua senha, por favor tente novamente.',
        'ErroAtualizarInformacoes' : 'Não foi possível atualizar suas informações.',
        'ErroAtualizarInformacoesApi' : 'Erro ao se conectar com o Guardiões para atualizar suas informações: ',
        'BuscandoInformacoes' : 'Buscando suas informações...',
        'AtualizandoInformacoes' : 'Atualizando suas informações...',
        'EmailInvalido' : 'E-mail inválido.',
        'ErroCarregarPerfilApi' : 'Erro ao se conectar com o Guardiões para carregar os dados do perfil: ',
        'InformacoesAtualizadasSucesso' : 'Informações atualizadas com sucesso.',
        'NomeCompleto' : 'Nome completo',
        'ComoQuerSerChamado' : 'Como quer ser chamado? ',
        'DataNascimento' : 'Data de nascimento',
        'Email' : 'E-mail',
        'Genero' : 'Gênero',
        'Escolaridade' : 'Escolaridade',
        'Idioma' : 'Idioma',
        'Salvar' : 'Salvar',
        'ErroAceitarTermosUso' : 'Por favor aceite os termos de uso antes de prosseguir.',
        'Comentarios' : 'Comentários',
        'Animais' : 'Animais',
        'Plantas' : 'Plantas',
        'Animal' : 'Animal',
        'Planta' : 'Planta',
        'QueroReceberNotificacao' : 'Quero receber notificações sobre pendências de identificação',
        'NaoQueroReceber' : 'Não quero receber',
        'EspecifiqueLinkCurriculo' : 'Especifique o link para seu currículo.',
        'PoliticaParticipacaoEspecialista' : 'Política de participação como especialista',
        'TermosUso' : 'Termos de uso',
        'SelecioneFrequencia' : 'Selecione uma frequência',
        'EspecialistaColaborarIdentificacao' : 'Se você é um especialista e quer colaborar na identificação dos espécimes, preencha os dados abaixo.',
        'ConfirmoAceitarTermosUso' : 'Confirmo que quero colaborar com os Guardiões da Biodiversidade como especialista e que li e concordo com os termos estabelecidos.',
        'CadastroNaoRealizado' : 'Não foi possível realizar seu cadastro, por favor tente novamente.',
        'TituloCadastro' : 'Cadastre-se',
        'Cadastrar' : 'Cadastrar',
        'Aguarde' : 'Aguarde...',
        'RecuperarSenhaSucesso' : 'Solicitação enviada com sucesso.',
        'RecuperarSenhaErro' : 'Ocorreu um erro, por favor tente novamente.',
        'RecuperarSenha' : 'Recuperar Senha',
        'Recuperar' : 'Recuperar',
        'DesejaRealmenteExcluir' : 'Deseja realmente excluir essas observações ?',
        'MsgExcluirObsNaoEnviadas' : 'Você tem observações ainda não enviadas, deseja excluí-las também ?',
        'ExcluindoObservacoes' : 'Excluindo observações...',
        'ObservacoesExcluidasSucesso' : 'Suas observações foram excluídas com sucesso.',
        'ExcluirObservacoesErro' : 'Ocorreu um erro ao excluir suas observações, por favor tente novamente.',
        'FazerLoginEnviarObservacoes' : 'Você precisa efetuar o Login antes de poder enviar observações.',
        'ConexaoInternetNaoDisponivel' : 'Não há conexão com Internet disponível. Certifique-se de que haja uma conexão para enviar sua observação.',
        'EnviandoObservacoes' : 'Enviando observações...',
        'CarregandoObservacoes' : 'Carregando observações...',
        'ObservacaoSalvaSucesso' : 'Observação salva com sucesso.',
        'NenhumaObservacaoCadastrada' : 'Nenhuma observação cadastrada.',
        'TodasObservacoesJaEnviadas' : 'Todas as observações selecionadas já foram enviadas anteriormente.',
        'ObservacoesEnviadasComSucesso' : 'Suas observações foram enviadas com sucesso.',
        'EnviarErroObservacao':'Ocorreu um erro ao enviar as observações.',
        'SelecioneInteracao': 'Selecione a interação',
        'SistemaLocalizacao' : 'O sistema de localização do seu dispositivo está desabilitado. Para uma melhor experiência ative o sistema de localização.',
        'SelecioneOrigemFoto' : 'Selecione a origem da foto:',
        'Camera' : 'Câmera',
        'Galeria' : 'Galeria',
        'Cancelar' : 'Cancelar',
        'ErroMensagemIteracao' : '- Deve existir pelo menos uma foto da interação.',
        'ErroMensagemPlanta' : '- Deve existir pelo menos uma foto da planta.',
        'ErroMensagemBranco' : '- Grupo não pode ficar em branco.',
        'ErroMensagemData' : '- O campo data não pode ficar em branco.',
        'ErroMensagemIntervalo' : '- O campo intervalo não pode ficar em branco.',
        'ErroMensagemLocalizacao' : '- Sistema de localização não encontrado, ou a sua localização não foi selecionada.',
        'ErroMensagem' : 'Informações obrigatórias:',
        'SalvandoMensagem' : 'Salvando observação...',
        'ErroAoSalvar' : 'Erro ao salvar observação:',
        'CarregandoObservacao' : 'Carregando observação...',
        'Observacao' : 'Observação',
        'ObservacaoEnviada' : 'Observação enviada',
        'ErroAoCarregar' : 'Erro ao carregar observação:',
        'DesejaExcluir' : 'Deseja excluir essa foto?',
        'SelecionarGrupoAnimal' : 'Selecione o grupo do animal',
        'Selecionarlocalizacao' : 'Selecionar localização',
        'InstrucaoLocalizacao' : 'Segure e arraste o "marcador" vermelho para atualizar a marcação.',
        'VisualizarFoto':'Visualizar foto',
        'FotosInteracao' : 'Fotos da interação',
        'InstrucaoFotos' : 'Adicione de uma a quatro fotos da interação entre animal e planta. Para excluir ou ampliar a foto, toque na imagem e segure.',
        'SelecionarFoto':'Selecione uma foto',
        'PerguntaAnimal':'Que animal é esse?',
        'DescricaoFoto':'Adicione de uma a quatro fotos da planta. Para excluir ou ampliar a foto, toque na imagem e segure.',
        'FotoPlanta':'Fotos da planta',
        'HabitoPlanta':'Hábito da planta',
        'Localizacao' : 'Localização',
        'LocalizacaoAtivado':'Se o sistema de localização está ativado, a localização da observação é definida automaticamente no mapa. Caso contrário, selecione a localização da observação manualmente.',
        'AguardandoPrimeiraFoto':'Mapa aguardando a primeira foto ou seleção manual...',
        'SelecioneHabito':'Selecione o hábito da planta',
        'SelecionarManualmente':'SELECIONAR MANUALMENTE',
        'Pais' : 'país',
        'Estado' : 'estado',
        'Municipio' : 'município',
        'Localidade' : 'localidade',
        'Data' : 'data (dia/mês/ano)',
        'Hora' : 'hora',
        'Identificacao' : 'Identificação',
        'CompletarAnimal' : 'Preencha os formulários de identificação do animal e da planta com as informações que souber.',
        'NomePopular': 'nome popular',
        'Familia' : 'família',
        'NomeEspecie':'nome da espécie',
        'Observacoes' : 'observações',
        'ObservacoesTitulo' : 'Observações',
        'SelecioneTipoInteracao':'Selecione o tipo de interação',
        'InteracaoAnimalPlanta':'Interação entre o animal e a planta',
        'ObservacoesGerais':'Observações gerais',
        'DescrevaInformacoes':'Descreva outras informações que achar importante',
        'Ajuda' : 'Ajuda',
        'Sair' : 'Sair',
        'ConfirmaEnvio' : 'Confirma o envio?',
        'Nao' : 'Não',
        'Sim' : 'Sim',
        'DesejaSair': 'Deseja sair?',
        'Login' : 'Iniciar sessão',
        'EsqueceuSenha' : 'Esqueceu sua senha? Clique aqui.',
        'Entrar' : 'Entrar',
        'AcessarCom' : 'Ou acesse com:',
        'NovoCadastro' : 'Ainda não é um guardião? Faça seu cadastro!',
        'ErroLogin':'Usuário e/ou senha inválidos.',
        'LoginInstagram' : 'Login com Instagram',
        'ErroLoginNaoFoiPossivel' : 'Não foi possível realizar seu login, por favor tente novamente',
        'ErroAPI' : 'Erro ao acessar a API: ',
        'NaoFoiPossivelLogar' : 'Não foi possível realizar login.',
        'TextoAjuda1' : 'O app está vinculado ao sistema online',
        'TextoLinkSiteGuardioes' : 'Guardiões da Biodiversidade ', 
        'TextoAjuda2' : 'Com ele, é possível registrar as observações de interações entre animais e plantas e enviar ao sistema. O registro de observações no app pode ser feito sem o acesso a Internet, porém, é necessária uma conexão para enviá-las ao sistema.',
        'TextoAjuda3' : 'Não é necessário estar logado no app para registrar uma observação, porém, para enviá-la ao sistema, o app exigirá que você se identifique com a mesma conta cadastrada no sistema.',
        'TextoAjuda4' : 'Se você ainda não é cadastrado, pode realizar o cadastro pelo app.',
        'TextoAjuda5' : 'Para o melhor uso do app, é recomendado que você ative o sistema de localização.',
        'TituloComoRegistrarObservacao' : 'Como registrar uma observação ',
        'TextoComoRegistrarObservacao' : 'No menu ',
        'TextoComoRegistrarObservacao2' :' , toque em Nova observação. Você será direcionado para o formulário de registro de uma nova observação de interação. Neste formulário, nem todos os campos são de preenchimento obrigatório.',
        'TextoComoRegistrarObservacao3' : 'Campos de preenchimento obrigatório são aqueles cujas informações são necessárias para enviar uma observação ao sistema.',
        'TituloAjudaFotosInteracao' : '1. Fotos da interação',
        'TextoAjudaFotosInteracao' : 'Adicione de uma a quatro fotos da interação entre animal e planta. Para excluir ou ampliar a foto, toque na imagem e segure.',
        'TituloAjudaQueAnimalEhEsse' : '2. Que animal é esse?',
        'TextoAjudaQueAnimalEhEsse' : 'Selecione o grupo do animal que observou. Se o grupo do animal não estiver presente na lista, selecione a opção "outro animal". Essa informação é necessária para nos ajudar a localizar especialistas que possam identificar o animal observado na interação.',
        'TituloAjudaFotosPlanta' : '3. Fotos da planta',
        'TextoAjudaFotosPlanta' : 'Adicione de uma a quatro fotos mostrando a planta que observou. Escolha as fotos a partir da câmera ou da galeria. Pelo menos uma foto é obrigatória. No entanto, são desejáveis fotos da planta nas seguintes vistas: (1) flor vista de frente, (2) ramo com as folhas, (3) planta inteira com a vegetação do entorno e (4) fruto, pois auxilia os especialistas na identificação.',
        'TituloAjudaLocalizacao' : '4. Localização',
        'TextoAjudaLocalizacao' : 'Use o mapa para localizar onde foi feita a observação. Se o sistema de localização do dispositivo fotográfico está ativado, a localização da observação é definida automaticamente no mapa. Se o sistema de localização não estiver ativado, selecione a localização da observação manualmente. Os campos “país”, “estado” e “município” são preenchidos automaticamente assim que a localização da observação é definida. Os campos "localidade", "data" e "hora" podem ser preenchidos manualmente, se necessário. O campo ”localidade” serve para indicar, por exemplo, um ponto de referência para a interação observada. Os campos “data” e “hora” são preenchidos com a data, considerando dia, mês e ano, e hora, considerando intervalos de duas horas, em que a interação foi observada.',
        'TituloAjudaIdentificacao' : '5. Identificação',
        'TextoAjudaIdentificacao' : 'Preencha os formulários de identificação do animal e da planta com as informações que souber. Por exemplo, se conhecer somente o nome popular, preencha o campo referente a essa informação. As demais podem ficar em branco. Quando uma identificação é submetida pelo guardião, obrigatoriamente passará pela avaliação de um especialista, que indicará se a identificação é válida para compor o banco de dados do sistema.',
        'TituloHabitoPlanta' : '6. Hábito da planta',
        'TextoHabitoPlanta' : 'Selecione o hábito da planta que observou. Se o hábito não estiver presente na lista, selecione a opção “nenhuma das anteriores”.',
        'TituloAjudaTipoInteracao' : '7. Tipo de interação',
        'TextoAjudaTipoInteracao' : 'Selecione a interação que observou. Se a interação não estiver presente na lista, selecione a opção “nenhuma das anteriores”.Toque em salvar para salvar a observação de interação registrada.',
        'TituloAjudaCamposPreenchimentoNaoObrigatorio1' : 'Campos de preenchimento ',
        'TituloAjudaCamposPreenchimentoNaoObrigatorio2' : 'não ',
        'TituloAjudaCamposPreenchimentoNaoObrigatorio3' : 'obrigatório',
        'TextoAjudaCamposPreenchimentoNaoObrigatorio' : 'são aqueles cujas informações não são necessárias para enviar uma observação ao sistema, podendo deixá-los em branco, caso o guardião não tenha certeza do que observou. No entanto, devem ser preenchidos se o guardião souber. ',
        'TituloAjudaComoEnviarObservacaoOnline' : 'Como enviar uma observação ',
        'TextoAjudaComoEnviarObservacaoOnline1' : 'No menu ',
        'TextoAjudaComoEnviarObservacaoOnline2' : ' , toque em Observações.',
        'TextoAjudaComoEnviarObservacaoOnline3' : 'Toque em ',
        'TextoAjudaComoEnviarObservacaoOnline4' : ' para selecionar a observação que deseja enviar para o sistema.',
        'TextoAjudaComoEnviarObservacaoOnline5' : ' para enviar a observação para o sistema. Na caixa de mensagem',
        'TextoAjudaComoEnviarObservacaoOnline6' : ' Confirma o envio?',
        'TextoAjudaComoEnviarObservacaoOnline7' : ', toque em',
        'TextoAjudaComoEnviarObservacaoOnline8' : ' sim',
        'TextoAjudaComoEnviarObservacaoOnline9' : ' e verifique o aparecimento da mensagem ',
        'TextoAjudaComoEnviarObservacaoOnline10' : 'Suas observações foram enviadas com sucesso.',
        'TextoAjudaComoEnviarObservacaoOnline11' : ' Isso significa que as observações já fazem parte do banco de dados do sistema ',
        'TextoAjudaComoEnviarObservacaoOnline12' : 'online.',
        'TextoAjudaComoEnviarObservacaoOnline13' : 'As observações que foram enviadas ao sistema estarão sempre indicadas com o símbolo ',
        'TextoAjudaComoEnviarObservacaoOnline14' : ' lado direito da localização.',
        'TextoAjudaComoEnviarObservacaoOnline15' : 'Você será direcionado para uma página que contém o registro de todas as suas observações.',
        'TituloAjudaComoExcluirObservacao' : 'Como excluir uma observação',
        'TextoAjudaVocePodeExcluirObservacao' : 'Você pode excluir uma observação em dois momentos: ',
        'TextoAjudaExcluirObservacaoMomentoUm' : '•	Ao excluir uma observação antes de enviá-la ao sistema, ela será apagada definitivamente e não fará parte do banco de dados do sistema online. ',
        'TextoAjudaExcluirObservacaoMomentoDois' : '• Ao excluir uma observação depois de enviá-la ao sistema, ela será apagada somente no app; continuará a fazer parte do sistema online e visível aos usuários. ',
        'TextoAjudaParaExcluirUmaObservacao' : 'Para excluir uma observação, selecione-a tocando em ',
        'TextoAjudaParaExcluirUmaObservacao2' : '. Depois, toque em ',
        'TextoAjudaParaExcluirUmaObservacao3' : '. Confirme as mensagens que aparecerão para que as observações sejam excluídas.',
        'TituloAjudaOutrasInformacoes' : 'Outras informações',
        'TextoAjudaOutrasInformacoes' : 'Visite os ',
        'TextoAjudaOutrasInformacoes2' : ' e conheça mais sobre o sistema! Na página do sistema, você encontrará informações sobre nossa comunidade de guardiões, todas as observações registradas, como explorá-las, e uma seção com as perguntas mais comumente feitas pelos usuários. Ao entrar como guardião, você também terá acesso às funcionalidades de registro de observações, além de um glossário com explicações de termos biológicos. ',
        'TermosUsoLidoAceitoGuardiao' : 'Termos de uso lido e aceito em: ',
        'TermosUsoLidoAceitoEspecialista' : 'Termos de uso do especialista lido e aceito em: ',
        'DeixarDeSerEspecialista' : 'Deixar de ser um especialista',
        'ConfirmoAceitarTermosUsoGuardiao' : 'Li e aceito os termos de uso.',
        'DesejaRealmenteDeixarSerEspecialista' : 'Deseja realmente deixar de ser um especialista?',
        'MarqueGruposTaxonomicos':'Marque os grupos taxonômicos nos quais quer colaborar com identificações.',
        'BuscarEspecie' : 'Buscar Espécie',
        'BuscarFamilia' : 'Buscar Família',
    },
    'en':{
        'NovaObservacao':'New observation',
        'MeuPerfil':'My profile',
        'Guardiao':'Guardian',
        'Especialista':'Specialist',
        'AlterarSenha':'Change password',
        'CampoObrigatorio':'Required field.',
        'Senha':'Password',
        'ConfirmarSenha':'Confirm password',
        'Alterar':'Change',
        'SenhasDiferentes':'The Password and Confirm password fields must be the same.',
        'SenhaAlteradaSucesso' : 'Password changed successfully.',
        'ErroAlterarSenha' : 'We were unable to change your password, please try again.',
        'ErroAtualizarInformacoes' : 'We could not update your information.',
        'BuscandoInformacoes' : 'Searching for your information ...',
        'AtualizandoInformacoes' : 'Updating your information ...',        
        'EmailInvalido' : 'Invalid email.',
        'ErroAtualizarInformacoesApi' : 'Error accessing API to update your information: ',
        'ErroCarregarPerfilApi' : 'Error accessing API to load profile data: ',
        'InformacoesAtualizadasSucesso' : 'Information updated successfully.',
        'NomeCompleto' : 'Full name',
        'ComoQuerSerChamado' : 'Nickname',
        'DataNascimento' : 'Birthdate',
        'Email' : 'E-mail',
        'Genero' : 'Gender',
        'Escolaridade' : 'Education level',
        'Idioma' : 'Language',
        'Salvar' : 'Save',
        'Comentarios' : 'Comments',
        'ErroAceitarTermosUso' : 'Please accept the terms of use before proceeding.',
        'Animais' : 'Animals',
        'Plantas' : 'Plants',
        'Animal' : 'Animal',
        'Planta' : 'Plant',
        'QueroReceberNotificacao' : 'I want to receive notifications about pending ID: ',
        'NaoQueroReceber' : 'I do not want to receive',
        'EspecifiqueLinkCurriculo' : 'Specify the link to your curriculum.',
        'PoliticaParticipacaoEspecialista' : 'Participation policy as a specialist',
        'TermosUso' : 'Terms of use',
        'EspecialistaColaborarIdentificacao' : 'If you are a specialist and would like to collaborate in identifying the specimens, fill in the information below.',
        'SelecioneFrequencia' : 'Select a frequency',
        'ConfirmoAceitarTermosUso' : 'I confirm that I want to collaborate with the Guardiões da Biodiversidade as a specialist and that I have read and agree to the terms set forth.',
        'CadastroNaoRealizado' : 'Unable to register, please try again',
        'TituloCadastro' : 'Register',
        'Cadastrar' : 'Register',
        'Aguarde' : 'Wait...',
        'RecuperarSenhaSucesso' : 'Request sent successfully.',
        'RecuperarSenhaErro' : 'An error occurred. Please try again.',
        'RecuperarSenha' : 'Recover password',
        'Recuperar' : 'Recover',
        'DesejaRealmenteExcluir' : 'Do you really want to exclude these observations?',
        'ObservacaoSalvaSucesso' : 'Observation saved successfully.',
        'NenhumaObservacaoCadastrada' : 'No observations posted.',
        'Observacoes' : 'Observations',
        'EnviandoObservacoes' : 'Sending observations...',
        'TodasObservacoesJaEnviadas' : 'All observations selected previously shipped.',
        'ObservacoesEnviadasComSucesso' : 'Observations successfully sent.',
        'EnviarErroObservacao' : 'There was an error sending observation.',
        'SelecioneInteracao' : 'Select an interaction',
        'SistemaLocalizacao' : 'Your devices location system is disabled. For a better experience activate the location system.',
        'SelecioneOrigemFoto' : 'Select the photo source:',
        'Camera' : 'Camera',
        'Galeria' : 'Gallery',
        'Cancelar' : 'Cancel',
        'ErroMensagemIteracao' : '- At least one photo of the interaction is required.',
        'ErroMensagemPlanta' : '- At least one photo of the plant is required.',
        'ErroMensagemBranco' : '- Group cannot be empty.',
        'ErroMensagemData' : '- Date field can not be empty.',
        'ErroMensagemIntervalo' : '- Range field can not be empty.',
        'ErroMensagemLocalizacao' : '- Location system not found, or your location was not selected.',
        'ErroMensagem' : 'Required information:',
        'SalvandoMensagem' : 'Saving observation...',
        'ErroAoSalvar' : 'Error saving observation:',
        'CarregandoObservacao' : 'Loading a observation...',
        'Observacao' : 'Observation',
        'ObservacaoEnviada' : 'Observation sent',
        'ErroAoCarregar' : 'Error loading observation:',
        'DesejaExcluir' : 'Do you want to delete this photo?',
        'SelecionarGrupoAnimal' : 'Select the animal group',
        'Selecionarlocalizacao' : 'Select location',
        'InstrucaoLocalizacao' : 'Hold and drag the red "pin" to change location.',
        'VisualizarFoto':'View photo',
        'FotosInteracao' : 'Interaction photos',
        'InstrucaoFotos' : 'Add a photo of the interaction between animal and plant. To pause or enlarge a photo, touch the image and hold.',
        'SelecionarFoto':'Select a photo',
        'PerguntaAnimal':'What animal is this?',
        'DescricaoFoto':'Add one to four photos of the plant. To delete or enlarge the photo, touch the image and hold.',
        'FotoPlanta':'Plant photos',
        'HabitoPlanta':'Plant habit',
        'Localizacao' : 'Location',
        'LocalizacaoAtivado':'If the location system is enabled, the location of the observation is automatically set on the map. Otherwise, select the location of the note manually.',
        'AguardandoPrimeiraFoto':'Map waiting for the first photo or manual selection ...',
        'SelecioneHabito':'Select the plant habit',
        'SelecionarManualmente':'MANUALLY SELECT',
        'Pais' : 'country',
        'Estado' : 'state',
        'Municipio' : 'municipality',
        'Localidade' : 'locality',
        'Data':'date (day/month/year)',
        'Hora' : 'hour',
        'Identificacao' : 'Identification',
        'CompletarAnimal':'Complete the animal and plant identification forms with the information you know.',
        'NomePopular': 'common Name',
        'Familia' : 'family',
        'NomeEspecie':'species Name',
        'SelecioneTipoInteracao':'Select the type of interaction',
        'InteracaoAnimalPlanta':'Interaction between animal and plant',
        'ObservacoesGerais':'General remarks',
        'DescrevaInformacoes':'Describe any other information you think is important',
        'Ajuda' : 'Help',
        'Sair' : 'Logout',
        'ConfirmaEnvio' : 'Do you confirm shipping?',
        'Nao' : 'No',
        'Sim' : 'Yes',
        'MsgExcluirObsNaoEnviadas' : 'You have unsent observations, do you want to delete them?',
        'DesejaSair': 'Do you want to logout?',
        'Login' : 'Login',
        'EsqueceuSenha' : 'Forgot your password? Click here.',
        'Entrar' : 'Login',
        'AcessarCom' : 'Or go with:',
        'NovoCadastro' : 'Not yet a guardian? Make your registration!',
        'ErroLogin':'Username or password is invalid.',
        'LoginInstagram' : 'Login with Instagram',
        'ErroLoginNaoFoiPossivel' : 'Unable to log in, please try again',
        'ErroAPI' : 'Error accessing the API: ',
        'NaoFoiPossivelLogar' : 'Could not log in.',
        'ObservacoesExcluidasSucesso' : 'Your claims have been successfully deleted.',
        'TextoAjuda1' : 'The app is linked to the online system',
        'TextoLinkSiteGuardioes' : 'Guardiões da Biodiversidade ', 
        'TextoAjuda2' : 'With it, you can record observations of interactions between animals and plants and send them to the system. In-app review logging can be done without Internet access, however, a connection is required to send them to the system.',
        'TextoAjuda3' : 'You do not need to be logged in to the app to record a note, but to send it to the system, the app will require you to identify yourself with the same account that is registered to the system.',
        'TextoAjuda4' : 'If you have not yet registered, you can register for the app.',
        'TextoAjuda5' : 'For the best use of the app, it is recommended that you enable the location system.',
        'TituloComoRegistrarObservacao' : 'How to Record a observation ',
        'TextoComoRegistrarObservacao' : 'In the menu ',
        'TextoComoRegistrarObservacao2' :' , tap New Observation. You will be taken to the registration form for a new interaction note. In this form, not all fields are required. Required fields are those whose information is required to send a note to the system.',
        'TituloAjudaFotosInteracao' : '1. Interaction photos',
        'TextoAjudaFotosInteracao' : 'Add a photo of the interaction between animal and plant. To pause or enlarge a photo, touch the image and hold.',
        'TituloAjudaQueAnimalEhEsse' : '2. What animal is this?',
        'TextoAjudaQueAnimalEhEsse' : 'Select the group of animal you observed. If the animal group is not present in the list, select the "other animal" option. This information is needed to help us locate specialists who can identify the animal observed in the interaction.',
        'TituloAjudaFotosPlanta' : '3. Plant photos',
        'TextoAjudaFotosPlanta' : 'Add one to four photos showing the plant you observed. Choose photos from the camera or gallery. At least one photo is required. However, photos of the plant are desirable in the following views: (1) flower viewed from the front, (2) branch with leaves, (3) whole plant with surrounding vegetation and (4) fruit.',
        'TituloAjudaLocalizacao' : '4. Location',
        'TextoAjudaLocalizacao' : 'Use the map to locate where the observation was made. If the device\'s location system is enabled, the location of the observation is automatically set on the map. If the location system is not enabled, select the location of the observation manually. The fields "country", "state" and "county" are filled in automatically once the observation location is defined. The fields "location", "date" and "time" can be filled in manually, if necessary. The "locality" field is used to indicate, for example, a reference point for the observed interaction. The "date" and "time" fields are filled with the date, considering day, month and year, and time, considering intervals of two hours, in which the interaction was observed.',
        'TituloAjudaIdentificacao' : '5. Identification',
        'TextoAjudaIdentificacao' : 'Complete the animal and plant identification forms with the information you know. For example, if you only know the popular name, fill in the field for that information. The rest can be blank. When an identification is submitted by the guardian, it will necessarily undergo the evaluation of a specialist, who will indicate if the identification is valid to compose the system database.',
        'TituloHabitoPlanta' : '6. Plant habit',
        'TextoHabitoPlanta' : 'Select the habit of the plant you observed. If the habit is not present in the list, select the "none of the above" option.',
        'TituloAjudaTipoInteracao' : '7. Type of interaction',
        'TextoAjudaTipoInteracao' : 'Select the interaction you observed. If the interaction is not present in the list, select the "none of the above" option. Touch Save to save the recorded interaction note.',
        'TituloAjudaCamposPreenchimentoNaoObrigatorio1' : 'Fields of filling ',
        'TituloAjudaCamposPreenchimentoNaoObrigatorio2' : 'not ',
        'TituloAjudaCamposPreenchimentoNaoObrigatorio3' : 'required',
        'TextoAjudaCamposPreenchimentoNaoObrigatorio' : 'are those whose information is not required to send an observation to the system, and may leave them blank if the guardian is not sure what he observed. However, they must be completed if the guardian knows.',
        'TituloAjudaComoEnviarObservacaoOnline' : 'How to send a note ',
        'TextoAjudaComoEnviarObservacaoOnline1' : 'In the menu ',
        'TextoAjudaComoEnviarObservacaoOnline2' : ', tap Observation.',
        'TextoAjudaComoEnviarObservacaoOnline3' : 'Touch ',
        'TextoAjudaComoEnviarObservacaoOnline4' : ' to select the note you want to send to the system.',
        'TextoAjudaComoEnviarObservacaoOnline5' : ' to send the note to the system. In the message box',
        'TextoAjudaComoEnviarObservacaoOnline6' : ' Do you confirm shipping?',
        'TextoAjudaComoEnviarObservacaoOnline7' : ', touch',
        'TextoAjudaComoEnviarObservacaoOnline8' : ' yes',
        'TextoAjudaComoEnviarObservacaoOnline9' : ' and check the appearance of the message',
        'TextoAjudaComoEnviarObservacaoOnline10' : 'Your submissions have been successfully submitted.',
        'TextoAjudaComoEnviarObservacaoOnline11' : 'This means that the observations are already part of the system database',
        'TextoAjudaComoEnviarObservacaoOnline12' : 'online.',
        'TextoAjudaComoEnviarObservacaoOnline13' : 'Observations that have been sent to the system will always be indicated with the symbol',
        'TextoAjudaComoEnviarObservacaoOnline14' : ' right side of the location.',
        'TextoAjudaComoEnviarObservacaoOnline15' : 'You will be directed to a page that contains the record of all your observations.',
        'TituloAjudaComoExcluirObservacao' : 'Deleting an Observation',
        'TextoAjudaVocePodeExcluirObservacao' : ' You can delete an observation in two moments:',
        'TextoAjudaExcluirObservacaoMomentoUm' : '•	Deleting a observation before sending it to the system will delete it permanently and will not be part of the online system database.',
        'TextoAjudaExcluirObservacaoMomentoDois' : '• Deleting a note after it has been sent to the system will delete it only in the app; will continue to be part of the online system and visible to users. ',
        'TextoAjudaParaExcluirUmaObservacao' : 'To delete a note, select it by tapping ',
        'TextoAjudaParaExcluirUmaObservacao2' : '. Then tap ',
        'TextoAjudaParaExcluirUmaObservacao3' : '. Confirm the messages that appear so that the comments are deleted.',
        'TituloAjudaOutrasInformacoes' : 'Other information',
        'TextoAjudaOutrasInformacoes' : 'Visit the',
        'TextoAjudaOutrasInformacoes2' : ' and learn more about the system! On the system page, you will find information about our guardian community, all recorded observations, how to explore them, and a section with the most commonly asked questions by users. When you enter as a guardian, you will also have access to the log recording features, as well as a glossary with explanations of biological terms.',
        'ConexaoInternetNaoDisponivel' : 'There is no internet connection available. Make sure there is a connection to send your note.',
        'TermosUsoLidoAceitoGuardiao' : 'Terms of use read and accepted in: ',
        'DeixarDeSerEspecialista' : 'Stop being a specialist',
        'ConfirmoAceitarTermosUsoGuardiao' : 'I have read and accept the terms of use.',
        'DesejaRealmenteDeixarSerEspecialista' : 'Do you really want to stop being an expert?',
        'TermosUsoLidoAceitoEspecialista' : 'Terms of use of the expert read and accepted in: ',
        'ObservacoesTitulo' : 'Observations',
        'MarqueGruposTaxonomicos':'Check the taxonomic groups in which you want to collaborate with identifications.',
        'BuscarEspecie' : 'Search Species',
        'BuscarFamilia' : 'Search Family',

    },
};

let _idioma = {
    'pt':[
        {
            'key' : '',
            'label': 'Selecione'
        },
        {
            'key' : 'pt',
            'label': 'Português'
        },
        {
            'key' : 'en',
            'label': 'Inglês'
        },
    ] ,       
    'en':[
        {
            'key' : '',
            'label': 'Select'
        },
        {
            'key' : 'pt',
            'label': 'Portuguese'
        },
        {
            'key' : 'en',
            'label': 'English'
        },
    ] ,  
};

let _escolaridade = {
    'pt':[
        {
            'key' : '',
            'label': 'Selecione'
        },
        {
            'key' : 'fundamental',
            'label': 'Fundamental'
        },
        {
            'key' : 'medio',
            'label': 'Médio'
        },
        {
            'key' : 'superior',
            'label': 'Superior'
        },
        {
            'key' : 'pos',
            'label': 'Pós-Graduação'
        },
    ] ,       
    'en':[
        {
            'key' : '',
            'label': 'Select'
        },
        {
            'key' : 'fundamental',
            'label': 'Fundamental'
        },
        {
            'key' : 'medio',
            'label': 'Medium'
        },
        {
            'key' : 'superior',
            'label': 'University graduate'
        },
        {
            'key' : 'pos',
            'label': 'Postgraduate studies'
        },
    ] 
};

let _generos = {
    'pt':[
        {
            'key' : '',
            'label': 'Selecione'
        },
        {
            'key' : 'female',
            'label': 'Feminino'
        },
        {
            'key' : 'male',
            'label': 'Masculino'
        },
    ] ,       
    'en':[
        {
            'key' : '',
            'label': 'Select'
        },
        {
            'key' : 'female',
            'label': 'Female'
        },
        {
            'key' : 'male',
            'label': 'Male'
        },
    ] ,  
};


class Translate  {
    setLanguage(_language){
        global.language = _language;
        EventRegister.emit("Language");
    }

    getLanguage(){
        return global.language;
    }

    val(key){
        try 
        {
            if(functions.isNullOrEmpty(global.language))
            {
                global.language = 'pt';
            }
            
            return _strings[global.language][key];
        } 
        catch (error) 
        {
            return '<<' + key + '>>';
        }
    }
    valIdiomas()
    {
        try 
        {
            if(functions.isNullOrEmpty(global.language))
            {
                global.language = 'pt';
            }
            
            return _idioma[global.language];
        } 
        catch (error) 
        {
            return '<<' + key + '>>';
        }
    }
    valGeneros()
    {
        try 
        {
            if(functions.isNullOrEmpty(global.language))
            {
                global.language = 'pt';
            }
            
            return _generos[global.language];
        } 
        catch (error) 
        {
            return '<<' + key + '>>';
        }
    }
    valEscolaridades()
    {
        try 
        {
            if(functions.isNullOrEmpty(global.language))
            {
                global.language = 'pt';
            }
            
            return _escolaridade[global.language];
        } 
        catch (error) 
        {
            return '<<' + key + '>>';
        }
    }
}

module.exports = new Translate();