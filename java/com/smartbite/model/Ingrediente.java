package com.smartbite.model;

/**
 * Modelo Ingrediente de SmartBite.
 */
public class Ingrediente {
    private int ideIng;
    private String nomIng;
    private String colorIng;

    public Ingrediente() {}

    public Ingrediente(int ideIng, String nomIng, String colorIng) {
        this.ideIng = ideIng;
        this.nomIng = nomIng;
        this.colorIng = colorIng;
    }

    public int getIdeIng()             { return ideIng; }
    public void setIdeIng(int v)       { this.ideIng = v; }
    public String getNomIng()          { return nomIng; }
    public void setNomIng(String v)    { this.nomIng = v; }
    public String getColorIng()        { return colorIng; }
    public void setColorIng(String v)  { this.colorIng = v; }
}
