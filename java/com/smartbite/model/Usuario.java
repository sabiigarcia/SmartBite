package com.smartbite.model;

/**
 * Modelo Usuario de SmartBite.
 * Equivalente a Contacto.java del proyecto jakarta-docker-compose-project.
 */
public class Usuario {
    private int ideUsu;
    private String nomUsu;
    private String apeUsu;
    private String emailUsu;
    private String passUsu;

    public Usuario() {}

    public Usuario(int ideUsu, String nomUsu, String apeUsu, String emailUsu, String passUsu) {
        this.ideUsu = ideUsu;
        this.nomUsu = nomUsu;
        this.apeUsu = apeUsu;
        this.emailUsu = emailUsu;
        this.passUsu = passUsu;
    }

    public int getIdeUsu()           { return ideUsu; }
    public void setIdeUsu(int v)     { this.ideUsu = v; }
    public String getNomUsu()        { return nomUsu; }
    public void setNomUsu(String v)  { this.nomUsu = v; }
    public String getApeUsu()        { return apeUsu; }
    public void setApeUsu(String v)  { this.apeUsu = v; }
    public String getEmailUsu()      { return emailUsu; }
    public void setEmailUsu(String v){ this.emailUsu = v; }
    public String getPassUsu()       { return passUsu; }
    public void setPassUsu(String v) { this.passUsu = v; }
}
