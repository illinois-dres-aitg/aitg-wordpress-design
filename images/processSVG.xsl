<?xml version="1.0" encoding="UTF-8"?>
<xsl:transform version="1.0"
  xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
  xmlns:svg="http://www.w3.org/2000/svg">

  <xsl:output method="text" encoding="UTF-8" omit-xml-declaration="yes"/>
  <xsl:strip-space elements="*"/>

  <xsl:template match="/">
    <xsl:variable name="docElementName">
      <xsl:value-of select="concat(name(child::*), count(child::*))"/>
    </xsl:variable>
    const xmlns = 'http://www.w3.org/2000/svg';
    <xsl:apply-templates/>
    return <xsl:value-of select="$docElementName"/>;
    <!-- add blank line at end of output -->
    <xsl:text>
</xsl:text>
  </xsl:template>

  <!-- text nodes -->
  <xsl:template match="text()">
    <xsl:variable name="parentName">
      <xsl:call-template name="getParentName"/>
    </xsl:variable>

    <xsl:text>{</xsl:text>
      let text = document.createTextNode('<xsl:value-of select="normalize-space(.)"/>');
      <xsl:value-of select="$parentName"/>.appendChild(text);
    <xsl:text>}
    </xsl:text>
  </xsl:template>

  <!-- SVG elements with text content only: desc, title, script, style, foreignObject, metadata -->
  <!-- SVG elements with mixed content: text, tspan, textPath, altGlyph, a -->

  <!-- elements that may contain text -->
  <xsl:template match="svg:*[text()[normalize-space()]]">
    <xsl:variable name="currentName">
      <xsl:call-template name="getCurrentName"/>
    </xsl:variable>
    <xsl:variable name="parentName">
      <xsl:call-template name="getParentName"/>
    </xsl:variable>

    <xsl:call-template name="default">
      <xsl:with-param name="name" select="$currentName"/>
    </xsl:call-template>

    <xsl:apply-templates/>

    <xsl:call-template name="appendChild">
      <xsl:with-param name="currentName" select="$currentName"/>
      <xsl:with-param name="parentName" select="$parentName"/>
    </xsl:call-template>
  </xsl:template>

  <!-- all other elements -->
  <xsl:template match="svg:*">
    <xsl:variable name="currentName">
      <xsl:call-template name="getCurrentName"/>
    </xsl:variable>
    <xsl:variable name="parentName">
      <xsl:call-template name="getParentName"/>
    </xsl:variable>

    <xsl:call-template name="default">
      <xsl:with-param name="name" select="$currentName"/>
    </xsl:call-template>

    <xsl:if test="parent::*">
      <xsl:call-template name="appendChild">
        <xsl:with-param name="currentName" select="$currentName"/>
        <xsl:with-param name="parentName" select="$parentName"/>
      </xsl:call-template>
    </xsl:if>

    <xsl:apply-templates/>
  </xsl:template>

  <!-- NAMED TEMPLATES -->

  <xsl:template name="getCurrentName">
    <xsl:variable name="cname" select="name()"/>
    <xsl:variable name="cid" select="count(ancestor-or-self::*[$cname=name()]) + count(preceding::*[$cname=name()])"/>
    <xsl:value-of select="concat($cname, $cid)"/>
  </xsl:template>

  <xsl:template name="getParentName">
    <xsl:variable name="pname" select="name(..)"/>
    <xsl:variable name="pid" select="count(../ancestor-or-self::*[$pname=name()]) + count(../preceding::*[$pname=name()])"/>
    <xsl:value-of select="concat($pname, $pid)"/>
  </xsl:template>

  <xsl:template name="default">
    <xsl:param name="name"/>
    let <xsl:value-of select="$name"/> = document.createElementNS(xmlns, '<xsl:value-of select="name()"/>');
    <xsl:for-each select="@*">
      <xsl:value-of select="$name"/>.setAttributeNS(null, '<xsl:value-of select="name()"/>', '<xsl:value-of select="."/>');
    </xsl:for-each>
  </xsl:template>

  <xsl:template name="appendChild">
    <xsl:param name="currentName"/>
    <xsl:param name="parentName"/>
    <xsl:value-of select="$parentName"/>.appendChild(<xsl:value-of select="$currentName"/>);
  </xsl:template>

</xsl:transform>
