const arrayGlobalSite = process.env.GLOBAL_SITE.split('/');

export const globalSite = {
  nomeSite: arrayGlobalSite[0],  
  tituloSite: arrayGlobalSite[1],  
  idSite: arrayGlobalSite[2],
  homeSite: arrayGlobalSite[3]
}
