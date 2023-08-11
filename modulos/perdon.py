class Disco():
    def __init__(self, banda,nombre , canciones, ventas, precio):
        self.banda = banda
        self.nombre = nombre
        self.canciones = canciones
        self.ventas = ventas
        self.precio = precio
        print("Disco subido con exito")


    def publicar():
        print("Subiendo disco a spotify")

    def profit(self):
        print("Este disco ganò $",self.ventas*self.precio)

ruli = Disco("El Kuelgue", "Ruli", ["Cariño reptil", "Llamame"], 100, 500)

ruli.profit()                