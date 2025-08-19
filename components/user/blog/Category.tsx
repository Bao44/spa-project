import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Folder } from "lucide-react"
import { categories } from "@/lib/blog-data"

export function BlogCategories() {
  return (
    <Card className="mb-8 bg-gradient-to-br from-amber-50 via-orange-100 to-orange-50">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Folder className="h-5 w-5 text-primary" />
          Danh mục
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {categories.map((category) => (
            <div key={category.name} className="flex items-center justify-between">
              <span className="text-muted-foreground hover:text-foreground transition-colors cursor-pointer">
                {category.name}
              </span>
              <Badge variant="secondary" className="text-xs bg-amber-700">
                {category.count}
              </Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
