import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export function CTA() {
  return (
    <section className="py-20 px-6" style={{ backgroundColor: "#03081d" }}>
      <div className="max-w-4xl mx-auto">
        <Card className="border-0 shadow-2xl bg-gradient-to-br from-blue-600 to-cyan-400 overflow-hidden">
          <CardContent className="p-12 text-center space-y-6">
            <h2 className="text-4xl lg:text-5xl font-bold text-white">Ready to Start Your Project?</h2>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              Let's collaborate and bring your ideas to life. Get in touch today and let's create something amazing
              together.
            </p>
            <div className="flex items-center justify-center gap-4 flex-wrap">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50 h-14 px-8 text-lg shadow-xl">
                Get In Touch
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-white text-white hover:bg-white/10 h-14 px-8 text-lg bg-transparent"
              >
                View Resume
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
