package com.smartbite.model;

/**
 * Modelo Receta de SmartBite.
 */
public class Receta {
    private int ideRec;
    private String nomRec;
    private String tiempoRec;
    private String dificultadRec;
    private String imagenRec;

    public Receta() {}

    public Receta(int ideRec, String nomRec, String tiempoRec, String dificultadRec, String imagenRec) {
        this.ideRec = ideRec;
        this.nomRec = nomRec;
        this.tiempoRec = tiempoRec;
        this.dificultadRec = dificultadRec;
        this.imagenRec = imagenRec;
    }

    public int getIdeRec()             { return ideRec; }
    public void setIdeRec(int v)       { this.ideRec = v; }
    public String getNomRec()          { return nomRec; }
    public void setNomRec(String v)    { this.nomRec = v; }
    public String getTiempoRec()       { return tiempoRec; }
    public void setTiempoRec(String v) { this.tiempoRec = v; }
    public String getDificultadRec()       { return dificultadRec; }
    public void setDificultadRec(String v) { this.dificultadRec = v; }
    public String getImagenRec()       { return imagenRec; }
    public void setImagenRec(String v) { this.imagenRec = v; }
}
