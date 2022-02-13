# 时空图

试图用时空图和简单几何处理一些狭义相对论运动学问题。

## Custom Variables in Front Matter

如无说明，默认实现于`/_includes/head-custom.html`。（`/`代表仓库的`docs/`。）

<table>
    <thead>
        <tr>
            <th style='text-align: center;'>VARIABLE</th>
            <th style='text-align: center;'>DESCRIPTION</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>
                <p><code>layout.script</code></p>
            </td>
            <td>
                <p>添加脚本，<code>String?</code>。</p>
                <p><code>/assets/js/</code>中 JavaScript 文件的文件名（不含扩展名）。</p>
                <p>使用<code>type='module'</code>引入。</p>
            </td>
        </tr>
        <tr>
            <td>
                <p><code>layout.style</code></p>
            </td>
            <td>
                <p>添加样式，<code>String?</code>。</p>
                <p>与<code>page.style</code>类似，但不支持多个。如需多个，请使用 Sass 的<code>@import</code>。</p>
            </td>
        </tr>
        <tr>
            <td>
                <p><code>page.graph</code></p>
            </td>
            <td>
                <p>启用 <a href="https://jsxgraph.org/">JSXGraph</a> 并引入程序，<code>String[]?</code>。</p>
                <p>序列中各项是<code>/assets/graph/</code>中 JavaScript 文件的文件名（不含扩展名）。</p>
                <p>使用<code>type='module'</code>引入。</p>
            </td>
        </tr>
        <tr>
            <td>
                <p><code>page.math</code></p>
            </td>
            <td>
                <p>启用 <a href="https://katex.org/">KaTeX</a>，<code>Boolean?</code>。</p>
                <p>默认关闭。</p>
                <p>会添加自动渲染扩展。</p>
            </td>
        </tr>
        <tr>
            <td>
                <p><code>page.order</code></p>
            </td>
            <td>
                <p>（仅限 docs）在所有文章中的序号，<code>Number</code>。</p>
                <p>用于生成索引、标题（<code>&lt;h1&gt;</code>）。</p>
                <p>实现于<code>/_layouts/docs.html</code>。</p>
            </td>
        </tr>
        <tr>
            <td>
                <p><code>page.style</code></p>
            </td>
            <td>
                <p>添加样式，<code>String[]?</code>。</p>
                <p>序列中各项是<code>/assets/css/</code>中样式文件的文件名（不含扩展名）。</p>
                <p>最终只会引入<code>*.css</code>。若源文件是<code>*.scss</code>，在开头添加 front matter 才会被 Jekyll 转换。</p>
            </td>
        </tr>
        <tr>
            <td>
                <p><code>page.xkcd</code></p>
            </td>
            <td>
                <p>支持 <a href='https://xkcd.com/'>xkcd</a> 的“alt-text”，<code>Boolean?</code>。</p>
                <p>默认关闭。</p>
                <p>实现于<code>/assets/js/xkcd.js</code>。</p>
            </td>
        </tr>
    </tbody>
</table>

另请参见`.vscode/markdown.code-snippets`。

### `site.check_issues`

实现于`/assets/js/check_issues/`、`/_includes/check_issues.html`、`/_sass/check_issues.scss`。

（下表中`_`代表`site.check_issues`）

<table>
    <thead>
        <tr>
            <th style='text-align: center;'>VARIABLE</th>
            <th style='text-align: center;'>DESCRIPTION</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>
                <p><code>_.source.repo</code></p>
            </td>
            <td>
                <p>源文件所在仓库及其所有者，<code>String</code>。</p>
                <p>例如<code>owner_name/repo_name</code>。</p>
            </td>
        </tr>
        <tr>
            <td>
                <p><code>_.source.folder</code></p>
            </td>
            <td>
                <p>构建 GitHub Pages 的分支、文件夹，<code>String</code>。</p>
                <p>见 (Repo's) Settings → Code and automation → Pages → Source。</p>
                <p>例如<code>main/docs</code>。若未更改 GitHub 的设置，可填<code>gh-pages</code>。</p>
            </td>
        </tr>
        <tr>
            <td>
                <p><code>_.min_update_interval</code></p>
            </td>
            <td>
                <p>最小检查间隔（单位：分钟），<code>Number?</code>。</p>
                <p>浏览器将自己请求 <a href='https://docs.github.com/rest'>GitHub API</a> 并缓存，因此无法认证，每小时上限为 60 次。不过程序请求时会带上 <a href="https://developer.mozilla.org/docs/Web/HTTP/Headers/ETag">ETag</a>，如果数据没变化，会返回 304 Not Modified），不计入次数。可通过 <a href="https://api.github.com/rate_limit">GET <code>/rate_limit</code></a> 查看使用情况。</p>
                <p>默认为 30 min。</p>
            </td>
        </tr>
    </tbody>
</table>

另外，只会检查第一页的 issues。（按最近更新时间排序的前 30 个）

## 注意事项

### 编辑

-   格式化 Markdown 文档可能导致数学公式异常（`\\( m_0 \\)` → `\\( m*0 \\)`），请分段格式化或多加检查。
-   Markdown 部分会被自动转义，HTML 部分不会，Markdown 部分识别出的数学公式（仅限`$`或`$$`包裹的）也不会。

### 内容

-   “参照系”“参考系”统一叫前者。
-   跨页链接请使用`{{ '/…' | relative_url }}`，这会自动添加`baseurl`。`{% link %}`在这里用处不大。
