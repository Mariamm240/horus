export const menuProducts = [
  { label: "Gafas de Sol", href: "/productos/gafas-de-sol", icon: "SunIcon" },
  { label: "Gafas Graduadas", href: "/productos/graduadas", icon: "EyeIcon" },
  { label: "Gafas Blue-light", href: "/productos/blue-light", icon: "ComputerDesktopIcon" },
  { label: "Accesorios", href: "/productos/accesorios", icon: "SparklesIcon" },
];

export const menuLentes = [
  { label: "Diarios", href: "/lentes/diarios", icon: "ClockIcon" },
  { label: "Quincenales", href: "/lentes/quincenales", icon: "CalendarDaysIcon" },
  { label: "Mensuales", href: "/lentes/mensuales", icon: "CalendarIcon" },
  { label: "De Color", href: "/lentes/color", icon: "PaintBrushIcon" },
  { label: "Suscripción", href: "/suscripcion", icon: "GiftIcon", featured: true },
];

export const mainNavigation = [
  {
    name: "Productos",
    href: "/productos",
    megaMenu: {
      sections: [
        {
          title: "Gafas",
          items: menuProducts
        },
        {
          title: "Populares",
          items: [
            { label: "Nuevos Arrivals", href: "/productos/nuevos", icon: "SparklesIcon" },
            { label: "Bestsellers", href: "/productos/bestsellers", icon: "FireIcon" },
            { label: "Ofertas", href: "/productos/ofertas", icon: "TagIcon" },
          ]
        }
      ]
    }
  },
  {
    name: "Lentes de Contacto",
    href: "/lentes-de-contacto",
    megaMenu: {
      sections: [
        {
          title: "Por Duración",
          items: menuLentes.filter(item => !item.featured)
        },
        {
          title: "Especiales",
          items: [
            ...menuLentes.filter(item => item.featured),
            { label: "Kit de Prueba", href: "/lentes/kit-prueba", icon: "BeakerIcon" },
            { label: "Cuidado", href: "/lentes/cuidado", icon: "HeartIcon" },
          ]
        }
      ]
    }
  },
  {
    name: "Servicios",
    href: "/servicios"
  },
  {
    name: "Testimonios",
    href: "/testimonios"
  },
  {
    name: "Contacto",
    href: "#"
  }
];

export const topBarInfo = {
  phone: "+57 (1) 234-5678",
  hours: "Lun - Vie: 9:00 AM - 7:00 PM",
  shipping: "Envíos gratis a partir de $200.000"
};
